// src/Workspace/buildFileTree.ts
import type { File } from './WorkspaceContext'

export type FileTreeNode = {
  name: string
  isFile: boolean
  path?: string
  children?: FileTreeNode[]
}

export function buildFileTree(files: File[]): FileTreeNode[] {
  const rootNodesByName: Map<string, FileTreeNode> = new Map()

  for (const file of files) {
    const pathSegments = file.path.split('/').filter(Boolean)

    if (pathSegments.length === 0) {
      continue
    }

    let currentLevelMap = rootNodesByName
    let parentNode: FileTreeNode | undefined

    pathSegments.forEach((segment, index) => {
      const isLeafSegment = index === pathSegments.length - 1
      const shouldBeFileNode = isLeafSegment

      let node: FileTreeNode | undefined
      if (!parentNode) {
        node = currentLevelMap.get(segment)
        if (!node) {
          node = {
            name: segment,
            isFile: shouldBeFileNode,
          }
          currentLevelMap.set(segment, node)
        } else if (node.isFile && !shouldBeFileNode) {
          node.isFile = false
        }
      } else {
        if (!parentNode.children) {
          parentNode.children = []
        }

        let childNode = parentNode.children.find(
          (child) => child.name === segment,
        )

        if (!childNode) {
          childNode = {
            name: segment,
            isFile: shouldBeFileNode,
          }
          parentNode.children.push(childNode)
        } else if (childNode.isFile && !shouldBeFileNode) {
          childNode.isFile = false
        }

        node = childNode
      }

      if (shouldBeFileNode) {
        node.isFile = true
        node.path = file.path
      } else {
        if (!node.children) {
          node.children = []
        }
      }

      parentNode = node
      if (!parentNode) {
        currentLevelMap = rootNodesByName
      }
    })
  }

  const sortNodes = (nodes: FileTreeNode[]): FileTreeNode[] => {
    nodes.sort((a, b) => a.name.localeCompare(b.name))
    for (const node of nodes) {
      if (node.children) {
        sortNodes(node.children)
      }
    }
    return nodes
  }

  return sortNodes(Array.from(rootNodesByName.values()))
}

// src/Workspace/buildFileTree.test.ts
import type { File } from './WorkspaceContext'
import { buildFileTree, type FileTreeNode } from './buildFileTree'

describe('buildFileTree', () => {
  it('nests provided example paths under app and app/src/WidgetList', () => {
    const files: File[] = [
      { path: 'app/data/featuredWidgets.js', contents: '' },
      { path: 'app/style.css', contents: '' },
      { path: 'app/src/WidgetList/WidgetList.tsx', contents: '' },
      { path: 'app/src/WidgetList/Widget.tsx', contents: '' },
    ]

    const tree = buildFileTree(files)

    const expected: FileTreeNode[] = [
      {
        name: 'app',
        isFile: false,
        children: [
          {
            name: 'data',
            isFile: false,
            children: [
              {
                name: 'featuredWidgets.js',
                isFile: true,
                path: 'app/data/featuredWidgets.js',
              },
            ],
          },
          {
            name: 'src',
            isFile: false,
            children: [
              {
                name: 'WidgetList',
                isFile: false,
                children: [
                  {
                    name: 'Widget.tsx',
                    isFile: true,
                    path: 'app/src/WidgetList/Widget.tsx',
                  },
                  {
                    name: 'WidgetList.tsx',
                    isFile: true,
                    path: 'app/src/WidgetList/WidgetList.tsx',
                  },
                ],
              },
            ],
          },
          {
            name: 'style.css',
            isFile: true,
            path: 'app/style.css',
          },
        ],
      },
    ]

    expect(tree).toEqual(expected)
  })

  it('handles a single root-level file', () => {
    const files: File[] = [
      { path: 'index.js', contents: '' },
    ]

    const tree = buildFileTree(files)

    expect(tree).toEqual<FileTreeNode[]>([
      {
        name: 'index.js',
        isFile: true,
        path: 'index.js',
      },
    ])
  })

  it('groups multiple top-level folders correctly', () => {
    const files: File[] = [
      { path: 'app/style.css', contents: '' },
      { path: 'config/default.json', contents: '' },
      { path: 'config/production.json', contents: '' },
    ]

    const tree = buildFileTree(files)

    expect(tree).toEqual<FileTreeNode[]>([
      {
        name: 'app',
        isFile: false,
        children: [
          {
            name: 'style.css',
            isFile: true,
            path: 'app/style.css',
          },
        ],
      },
      {
        name: 'config',
        isFile: false,
        children: [
          {
            name: 'default.json',
            isFile: true,
            path: 'config/default.json',
          },
          {
            name: 'production.json',
            isFile: true,
            path: 'config/production.json',
          },
        ],
      },
    ])
  })

  it('handles arbitrarily deep nesting', () => {
    const files: File[] = [
      { path: 'a/b/c/d/e/file.txt', contents: '' },
    ]

    const tree = buildFileTree(files)

    expect(tree).toEqual<FileTreeNode[]>([
      {
        name: 'a',
        isFile: false,
        children: [
          {
            name: 'b',
            isFile: false,
            children: [
              {
                name: 'c',
                isFile: false,
                children: [
                  {
                    name: 'd',
                    isFile: false,
                    children: [
                      {
                        name: 'e',
                        isFile: false,
                        children: [
                          {
                            name: 'file.txt',
                            isFile: true,
                            path: 'a/b/c/d/e/file.txt',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ])
  })

  it('merges shared folder prefixes from different files', () => {
    const files: File[] = [
      { path: 'app/src/index.tsx', contents: '' },
      { path: 'app/src/components/Button.tsx', contents: '' },
      { path: 'app/src/components/Input.tsx', contents: '' },
    ]

    const tree = buildFileTree(files)

    expect(tree).toEqual<FileTreeNode[]>([
      {
        name: 'app',
        isFile: false,
        children: [
          {
            name: 'src',
            isFile: false,
            children: [
              {
                name: 'components',
                isFile: false,
                children: [
                  {
                    name: 'Button.tsx',
                    isFile: true,
                    path: 'app/src/components/Button.tsx',
                  },
                  {
                    name: 'Input.tsx',
                    isFile: true,
                    path: 'app/src/components/Input.tsx',
                  },
                ],
              },
              {
                name: 'index.tsx',
                isFile: true,
                path: 'app/src/index.tsx',
              },
            ],
          },
        ],
      },
    ])
  })

  it('returns an empty array for no files', () => {
    const tree = buildFileTree([])

    expect(tree).toEqual([])
  })
  it('sorts files within the same directory alphabetically by name', () => {
    const files: File[] = [
      { path: 'app/data/featuredWidgets.js', contents: '' },
      { path: 'app/data/clearanceWidgets.js', contents: '' },
      { path: 'app/data/discontinuedWidgets.js', contents: '' },
    ]

    const tree = buildFileTree(files)

    expect(tree).toEqual<FileTreeNode[]>([
      {
        name: 'app',
        isFile: false,
        children: [
          {
            name: 'data',
            isFile: false,
            children: [
              {
                name: 'clearanceWidgets.js',
                isFile: true,
                path: 'app/data/clearanceWidgets.js',
              },
              {
                name: 'discontinuedWidgets.js',
                isFile: true,
                path: 'app/data/discontinuedWidgets.js',
              },
              {
                name: 'featuredWidgets.js',
                isFile: true,
                path: 'app/data/featuredWidgets.js',
              },
            ],
          },
        ],
      },
    ])
  })
  it('sorts directories alphabetically at every level', () => {
    const files: File[] = [
      { path: 'app/zeta/config.json', contents: '' },
      { path: 'app/alpha/config.json', contents: '' },
      { path: 'app/middle/another.json', contents: '' },
      { path: 'beta/file.txt', contents: '' },
      { path: 'alpha/file.txt', contents: '' },
    ]

    const tree = buildFileTree(files)

    expect(tree).toEqual<FileTreeNode[]>([
      {
        name: 'alpha',
        isFile: false,
        children: [
          {
            name: 'file.txt',
            isFile: true,
            path: 'alpha/file.txt',
          },
        ],
      },
      {
        name: 'app',
        isFile: false,
        children: [
          {
            name: 'alpha',
            isFile: false,
            children: [
              {
                name: 'config.json',
                isFile: true,
                path: 'app/alpha/config.json',
              },
            ],
          },
          {
            name: 'middle',
            isFile: false,
            children: [
              {
                name: 'another.json',
                isFile: true,
                path: 'app/middle/another.json',
              },
            ],
          },
          {
            name: 'zeta',
            isFile: false,
            children: [
              {
                name: 'config.json',
                isFile: true,
                path: 'app/zeta/config.json',
              },
            ],
          },
        ],
      },
      {
        name: 'beta',
        isFile: false,
        children: [
          {
            name: 'file.txt',
            isFile: true,
            path: 'beta/file.txt',
          },
        ],
      },
    ])
  })
})

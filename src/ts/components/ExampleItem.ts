import { DataUri, EdgeView, Graph, Point, ToolsView } from '@antv/x6'
import { ExampleItemV } from '../v/components/ExampleItem.v'

class EditableCellTool extends ToolsView.ToolItem<
  EdgeView,
  EditableCellToolOptions
  > {
  private editorContent!: HTMLDivElement

  public render() {
    super.render()
    const cell = this.cell
    let x = 0
    let y = 0
    let width = 0
    let height = 0

    if (cell.isNode()) {
      const position = cell.position()
      const size = cell.size()
      const pos = this.graph.localToGraph(position)
      const zoom = this.graph.zoom()
      x = pos.x
      y = pos.y
      width = size.width * zoom
      height = size.height * zoom
    } else {
      x = this.options.x - 40
      y = this.options.y - 20
      width = 80
      height = 40
    }

    const editorParent = ToolsView.createElement('div', false) as HTMLDivElement
    editorParent.style.position = 'absolute'
    editorParent.style.left = `${x}px`
    editorParent.style.top = `${y}px`
    editorParent.style.width = `${width}px`
    editorParent.style.height = `${height}px`
    editorParent.style.display = 'flex'
    editorParent.style.alignItems = 'center'
    editorParent.style.textAlign = 'center'

    this.editorContent = ToolsView.createElement('div', false) as HTMLDivElement
    this.editorContent.contentEditable = 'true'
    this.editorContent.style.width = '100%'
    this.editorContent.style.outline = 'none'
    this.editorContent.style.backgroundColor = cell.isEdge() ? '#fff' : ''
    this.editorContent.style.border = cell.isEdge() ? '1px solid #ccc' : 'none'
    this.editorContent.innerHTML = '添加文本'
    editorParent.appendChild(this.editorContent)
    this.container.appendChild(editorParent)

    this.init()

    return this
  }

  public init = () => {
    const cell = this.cell
    if (cell.isNode()) {
      const value = cell.attr('text/textWrap/text') as string
      if (value) {
        this.editorContent.innerText = value
        cell.attr('text/style/display', 'none')
      }
    }
    setTimeout(() => {
      this.editorContent.focus()
    })
    document.addEventListener('mousedown', this.onMouseDown)
  }

  public onMouseDown = (e: MouseEvent) => {
    if (e.target !== this.editorContent) {
      const cell = this.cell
      const value = this.editorContent.innerText
      cell.removeTools()
      if (cell.isNode()) {
        cell.attr('text/textWrap/text', value)
        cell.attr('text/style/display', '')
      } else if (cell.isEdge()) {
        cell.appendLabel({
          attrs: {
            text: {
              text: value,
            }
          },
          position: {
            distance: this.getDistance(),
          }
        })
      }
      document.removeEventListener('mousedown', this.onMouseDown)
    }
  }

  public getDistance() {
    const cell = this.cell
    if (cell.isEdge()) {
      const targetPoint = cell.getTargetPoint()
      const cross = cell.getSourceNode()!.getBBox().intersectsWithLineFromCenterToPoint(targetPoint)!
      const p = new Point(this.options.x, this.options.y)
      return p.distance(cross)
    }
    return 0
  }
}

EditableCellTool.config({
  tagName: 'div',
  isSVGElement: false,
})

export interface EditableCellToolOptions extends ToolsView.ToolItem.Options {
  x: number
  y: number
}

Graph.registerEdgeTool('editableCell', EditableCellTool, true)
Graph.registerNodeTool('editableCell', EditableCellTool, true)

// tslint:disable-next-line:no-empty-interface
export interface ExampleItemProps { }

export class ExampleItem extends ExampleItemV<ExampleItem> {
  public propsType!: ExampleItemProps
  public eventsType!: {}

  public graph!: Graph

  public onPropsChange(props: this['propsType']): void {
    // TODO:
  }

  public onMount() {
    setTimeout(() => {
      this.initGraph()
    }, 1000)
  }

  protected handleGetNodes(event: MouseEvent, eventData: this['E']['handleGetNodes']): void {
    console.log(this.graph.getNodes())
  }

  protected handleDownloadImg(event: MouseEvent, eventData: this['E']['handleDownloadImg']): void {
    this.graph.toPNG((dataUri) => {
      DataUri.downloadDataUri(dataUri, 'chart.png')
    })
  }

  protected handleCreateImg(event: MouseEvent, eventData: this['E']['handleCreateImg']) {
    this.graph.addNode({
      shape: 'image',
      x: 320,
      y: 120,
      width: 100,
      imageUrl: 'https://assets.weibanzhushou.com/web/fabric-demo/title-img.c3cba1fbbc4a.png'
    })
  }

  protected handleCreateText(event: MouseEvent, eventData: this['E']['handleCreateText']): void {
    this.graph.addNode({
      x: 40,
      y: 40,
      width: 100,
      height: 40,
      shape: 'html',
      html() {
        const wrap = document.createElement('div')
        wrap.style.width = '100%'
        wrap.style.height = '100%'
        wrap.style.background = '#fcfcfc'
        wrap.style.display = 'flex'
        wrap.style.justifyContent = 'center'
        wrap.style.alignItems = 'center'
        return wrap
      }
    })
  }

  private initGraph() {
    this.graph = new Graph({
      container: document.getElementById('container') as HTMLElement,
      width: 800,
      height: 600,
      rotating: true,
      resizing: true,
      history: true,
      /** 节点可移动区域 */
      translating: {
        restrict: true
      },
      selecting: true
    })
    this.graph.on('cell:dblclick', ({ cell, e }) => {
      const p = this.graph.clientToGraph(e.clientX, e.clientY)
      cell.addTools([
        {
          name: 'editableCell',
          args: {
            x: p.x,
            y: p.y,
          },
        },
      ])
    })
  }
}

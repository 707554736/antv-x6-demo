/* Auto generated file, DO NOT edit */
/* tslint:disable */
import { Component, RenderableStateDescriber, vState, ComponentInternal } from 'winged'


export abstract class ExampleItemV<V extends ExampleItemV<any>> extends Component<V> {
  public static readonly className = 'ExampleItem'
  public static createInternalInstance() { return new ViewInternal() }
  public _internal!: ViewInternal<V>
  /* props describer */
  public static readonly pD: RenderableStateDescriber = {}
  /* states */
  @vState() public readonly props?: Readonly<V['propsType']>
  /* refs */
  public readonly refs: {} = {} as any
  /* element event data types and subview defined data types */
  public E!: {
    handleCreateImg: {}
    handleCreateText: {}
    handleDownloadImg: {}
    handleGetNodes: {}
  }
  /* subview event data types */
  public SE!: {}
  /* event handlers */
  protected abstract handleCreateImg(event: MouseEvent, eventData: this['E']['handleCreateImg']): void
  protected abstract handleCreateText(event: MouseEvent, eventData: this['E']['handleCreateText']): void
  protected abstract handleDownloadImg(event: MouseEvent, eventData: this['E']['handleDownloadImg']): void
  protected abstract handleGetNodes(event: MouseEvent, eventData: this['E']['handleGetNodes']): void
}

class ViewInternal<V extends Component<any>> extends ComponentInternal<V>{
  /* content vdom struct */
  public static contentStruct: any = ['Esection', { id: 'example-item' }, [['Ediv', { id: 'container', style: 'border: 1px solid red;' }], ' ', ['Ebutton', { '@bind:click': 'handleCreateImg' }, ['添加图片']], ' ', ['Ebutton', { '@bind:click': 'handleCreateText' }, ['添加文本']], ' ', ['Ebutton', { '@bind:click': 'handleDownloadImg' }, ['下载图片']], ' ', ['Ebutton', { '@bind:click': 'handleGetNodes' }, ['获取画布中节点']]]]
  public contents = ViewInternal.contentStruct
  /* subview map */
  public readonly subviewMap = {}
}
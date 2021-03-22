/* Auto generated file, DO NOT edit */
/* tslint:disable */
import { Component, Page, vSubviewMap, PageInternal } from 'winged'
import { ExampleItemV } from '../components/ExampleItem.v'

export abstract class HomePageV<V extends HomePageV<any>> extends Page<V> {
  public static readonly className = 'HomePage'
  public static createInternalInstance() { return new ViewInternal() }
  public _internal!: ViewInternal<V>

  /* refs */
  public readonly refs: {} = {} as any
  /* element event data types and subview defined data types */
  public E!: {}
  /* subview event data types */
  public SE!: {}
}

class ViewInternal<V extends Page<any>> extends PageInternal<V>{
  public styleResolver = async function () { return import(/* webpackPreload: true, webpackChunkName: "HomePage.css" */ '../../../less/pages/home-page.less') }
  /* content vdom struct */
  public static contentStruct: any = ['Esection', [' Home Page ', ['LSubview', { is: '/example-item.html', props: '{}' }], ' ', ['Ediv', { id: 'container' }]]]
  public contents = ViewInternal.contentStruct
  /* subview map */
  @vSubviewMap([ExampleItemV.pD])
  public readonly subviewMap = {}
}


/* register used components */
import { ExampleItem } from '../../components/ExampleItem'
Component.rC(ExampleItem)
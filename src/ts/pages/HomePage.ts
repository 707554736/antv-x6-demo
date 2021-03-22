import { PageParams } from 'winged'
import { HomePageV } from '../v/pages/HomePage.v'

export class HomePage extends HomePageV<HomePage> {
  public onLoad(params: PageParams): void {
    console.log('todo')
  }
}

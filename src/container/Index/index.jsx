import { Button } from 'zarm';
import style from './style.module.less'

export default function Index() {
  return <div className={style.index}>
    <span>样式</span>
    <Button theme='primary'>按钮</Button>
  </div>
}

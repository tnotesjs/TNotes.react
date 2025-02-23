import './style.css';
import { Tooltip } from 'react-tooltip';

/**
 * src/App.jsx
 */
function App() {
  return (
    <>
      <h2>用法1：Using anchor data attributes</h2>
      <p>将 tip 信息写在需要展示 tip 信息的具体的元素上</p>
      <div className='wrapper'>
        <div className='box'>
          <a
            data-tooltip-id='my-tooltip'
            data-tooltip-content='Hello world!'
            data-tooltip-place='right'
          >
            ◕‿‿◕
          </a>
        </div>
        <div className='box'>
          <a
            data-tooltip-id='my-tooltip'
            data-tooltip-content='Hello to you too!'
          >
            ◕‿‿◕
          </a>
        </div>
      </div>
      <Tooltip id='my-tooltip' />

      <h2>用法2：Using ReactTooltip props</h2>
      <p>将 tip 信息绑定在 Tooltip 组件上，属性 anchorSelect 的值是 class 选择器，将所有匹配上的元素加上 tip。</p>
      <div className='wrapper'>
        <div className='box'><a className="my-anchor-element">◕‿‿◕</a></div>
        <div className='box'><a className="my-anchor-element">◕‿‿◕</a></div>
        <div className='box'><a className="my-anchor-element">◕‿‿◕</a></div>
      </div>
      <Tooltip anchorSelect=".my-anchor-element" place="top">
        Hello world!
      </Tooltip>
    </>
  );
}

export default App;

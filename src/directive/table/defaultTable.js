// defaultTableColumn.js
export default {
  bind(el, binding, vnode) {
    const defaultProps = {
      sortable: true,
      resizable: true,
      stripe: true,
      border: true,
      align: 'left',
    };

    const componentOptions = vnode.componentOptions;
    if (componentOptions && componentOptions.propsData) {
      for (const prop in defaultProps) {
        if (componentOptions.propsData[prop] === undefined) {
          componentOptions.propsData[prop] = defaultProps[prop];
        }
      }
    }
  }
}

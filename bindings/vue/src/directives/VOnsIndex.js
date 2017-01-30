let _isTabbar;
const _getIndex = event => event[_isTabbar ? 'index' : 'activeIndex'];
const _getActiveIndex = el => el[_isTabbar ? 'getActiveTabIndex' : 'getActiveIndex']();
const _setActiveIndex = (el, value, options) => el[_isTabbar ? 'setActiveTab' : 'setActiveIndex'](value, options);
const _setInitialIndex = (el, value) => {
  const attr = _isTabbar ? 'activeIndex' : 'initial-index';
  if (!el.hasAttribute(attr)) {
    el.setAttribute(attr, value);
  }
};

// VOnsIndex directive
export default {
  bind(el, binding, vnode) {
    const tag = el.tagName.toLowerCase();
    _isTabbar = tag === 'ons-tabbar';
    if (!['ons-tabbar', 'ons-carousel'].includes(tag)) {
      throw new Error('"v-ons-index" directive cannot be used with "' + tag + '" element.');
    }

    _setInitialIndex(el, binding.value);

    if (vnode.context.hasOwnProperty(binding.expression)) {
      vnode.child.$on('postchange', event => {
        vnode.context[binding.expression] = _getIndex(event);
      });
    }
  },

  update(el, binding, vnode) {
    if (binding.value !== _getActiveIndex(el)) {
      _setActiveIndex(el, binding.value, vnode.child.options);
    }
  }
};
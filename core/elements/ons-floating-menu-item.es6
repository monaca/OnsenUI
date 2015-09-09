/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(() => {
  'use strict';

  const scheme = {'': 'floating-menu__item--*'};
  const ModifierUtil = ons._internal.ModifierUtil;

  class FloatingMenuItemElement extends ons._BaseElement {
    createdCallback() {
      this.classList.add('floating-menu__item');
      ModifierUtil.initModifier(this, scheme);

      this._compile();
    }

    attributeChangedCallback(name, last, current) {
      if (name === 'modifier') {
        return ModifierUtil.onModifierChanged(last, current, this, scheme);
      }
    }

    _compile() {
      if (!this.hasAttribute('value')) {
        this.setAttribute('value', this.innerText);
      }
    }

  }

  if (!window.OnsFloatingMenuItemElement) {
    window.OnsFloatingMenuItemElement = document.registerElement('ons-floating-menu-item', {
      prototype: FloatingMenuItemElement.prototype
    });
  }
})();

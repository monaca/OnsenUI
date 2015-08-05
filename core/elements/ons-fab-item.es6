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

  const scheme = {'': 'fab__item--*'};
  const ModifierUtil = ons._internal.ModifierUtil;
  const RippleEffect = ons._internal.RippleEffect;

  class FabItemElement extends ons._BaseElement {

    createdCallback() {
      this.classList.add('fab__item');
      this._boundOnClick = this._onClick.bind(this);

      ModifierUtil.initModifier(this, scheme);
      if (this.hasAttribute('material')) {
        RippleEffect.addRippleEffect(this);
      }
    }

    attributeChangedCallback(name, last, current) {
      if (name === 'modifier') {
        return ModifierUtil.onModifierChanged(last, current, this, scheme);
      } else if (name === 'material') {
        if (current !== null) {
          RippleEffect.addRippleEffect(this);
        } else {
          RippleEffect.removeRippleEffect(this);
        }
      }
    }

    attachedCallback() {
      this.addEventListener('click', this._boundOnClick, false);
    }

    detachedCallback() {
      this.removeEventListener('click', this._boundOnClick, false);
    }

    _onClick(e) {
      e.stopPropagation();
    }

  }

  if (!window.FabItemElement) {
    window.FabItemElement = document.registerElement('ons-fab-item', {
      prototype: FabItemElement.prototype
    });
  }
})();

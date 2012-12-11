define("arale/select/2.0.0/select",["arale/overlay/0.9.12/overlay","$","arale/position/1.0.0/position","arale/iframe-shim/1.0.0/iframe-shim","arale/widget/1.0.2/widget","arale/base/1.0.1/base","arale/class/1.0.0/class","arale/events/1.0.0/events","arale/widget/1.0.2/templatable","gallery/handlebars/1.0.0/handlebars"],function(e,t,n){function a(e,t){var n,r=[],i=e.options,s=i.length,o=!1;for(n=0;n<s;n++){var u,a={},f=i[n],l=["text","value","defaultSelected","selected","disabled"];for(u in l){var c=l[u];a[c]=f[c]}a.defaultSelected=f.defaultSelected?"true":"false",f.selected?(a.selected="true",o=!0):a.selected="false",r.push(a)}return o||(newModel[0].selected="true"),{options:r,classPrefix:t}}function f(e,t){var n,r,i,s,o=[],u=[];for(n=0,i=e.length;n<i;n++){var a=e[n];a.selected?(a.selected=a.defaultSelected="true",u.push(a)):a.selected=a.defaultSelected="false",a.options&&a.options.length>0&&(a.options=f(a.options,t).options),o.push(a)}if(u.length>0){u.pop();for(r=0,s=u.length;r<s;r++)u[r].selected="false"}else o[0].selected="true";return{options:o,classPrefix:t}}function l(e,t,n){var r;if(i.isNumeric(e))r=e;else{e=t.parent().find(e);if(e.length==0)return n?[]:-1;r=t.index(e)}if(r<0){i.each(t,function(t,n){n=i(n);if(n.find(e).length>0)return r=t,!1});var s=l(e,t.eq(r).children("ul").children(),!0);return s instanceof Array||(s=[s]),[r].concat(s)}return n?[r]:r}function c(e,t){var n=e instanceof Array?e:[e],r;return i.each(n,function(e,n){r=t.eq(n),t=i("ul",r).children()}),r}function h(e,t){if(e==-1)return null;var n=e instanceof Array?e:[e],r;return i.each(n,function(e,n){r=t[n],t=r.options}),r}function p(e){var t=!1;return i.each(e,function(e,n){if(i.isArray(n.options)&&n.options.length>0)return t=!0,!1}),t}var r=e("arale/overlay/0.9.12/overlay"),i=e("$"),s=e("arale/widget/1.0.2/templatable"),o='<div class="{{classPrefix}}"> <ul class="{{classPrefix}}-content" data-role="content"> {{#each options}} <li data-role="item" class="{{../classPrefix}}-item {{#if disabled}}{{../../classPrefix}}-item-disabled{{/if}}" data-value="{{value}}" data-default-selected="{{defaultSelected}}" data-selected="{{selected}}" data-disabled="{{disabled}}">{{{text}}} {{#if options}} <ul style="display:none"> {{#each options}} <li data-role="item" class="{{../../../classPrefix}}-item {{#if disabled}}{{../../../../classPrefix}}-item-disabled{{/if}}" data-value="{{value}}" data-default-selected="{{defaultSelected}}" data-selected="{{selected}}" data-disabled="{{disabled}}">{{{text}}} {{#if options}} <ul style="display:none"> {{#each options}} <li data-role="item" class="{{../../../../../classPrefix}}-item {{#if disabled}}{{../../../../../../classPrefix}}-item-disabled{{/if}}" data-value="{{value}}" data-default-selected="{{defaultSelected}}" data-selected="{{selected}}" data-disabled={{disabled}}>{{{text}}}</li> {{/each}} </ul> {{/if}} </li> {{/each}} </ul> {{/if}} </li> {{/each}} </ul> </div>',u=r.extend({Implements:s,attrs:{trigger:{value:null,getter:function(e){return i(e).eq(0)}},classPrefix:"ui-select",template:o,align:{baseXY:[0,"100%-1px"]},renderTrigger:function(e){e=e.clone(),i("ul",e).remove();var t=i.trim(e.html());return e.remove(),t},name:"",value:"",length:0,selectedIndex:-1,multiple:!1,disabled:!1,selectSource:null},events:{"click [data-role=item]":function(e){e.stopPropagation();var t=i(e.currentTarget);t.attr("data-disabled")!="true"&&this.select(t)},"mouseenter [data-role=item]":function(e){i(e.currentTarget).addClass(this.get("classPrefix")+"-item-hover");var t=i(e.currentTarget).data("sub-overlay");t&&t._setPosition().show()},"mouseleave [data-role=item]":function(e){i(e.currentTarget).removeClass(this.get("classPrefix")+"-item-hover");var t=i(e.currentTarget).data("sub-overlay");t&&t.hide()}},initAttrs:function(e,t){u.superclass.initAttrs.call(this,e,t);var n=this.get("trigger");if(n[0].tagName.toLowerCase()=="select"){var r=n.attr("name");r&&this.set("name",r),this.set("selectSource",n);var s='<a href="#" class="'+this.get("classPrefix")+'-trigger"></a>',o=i(s);this.set("trigger",o),n.after(o).hide(),this.model=a(n[0],this.get("classPrefix"))}else{var r=this.get("name");if(r){var l=i("input[name="+r+"]").eq(0);l[0]||(l=i('<input type="hidden" id="select-'+r+'" name="'+r+'" />').insertBefore(n)),this.set("selectSource",l)}this.model=f(this.model,this.get("classPrefix"))}},setup:function(){var e=this,t=this.get("trigger").on("click",{self:this},this._trigger_click).on("mouseenter",function(n){t.addClass(e.get("classPrefix")+"-trigger-hover")}).on("mouseleave",function(n){t.removeClass(e.get("classPrefix")+"-trigger-hover")});this.options=this.$("[data-role=content]").children(),this.set("multiple",p(this.model.options));if(i("[data-selected=true]",this.element).is(i("[data-disabled=true]",this.element)))throw new Error("A disabled item cannot be selected, check your model.");this.select("[data-selected=true]"),this.set("length",this.options.length),this._tweakAlignDefaultValue(),this._blurHide(t),this._initSubSelectPosition(),u.superclass.setup.call(this)},render:function(){return u.superclass.render.call(this),this._setTriggerWidth(),this},show:function(){return u.superclass.show.call(this),this},_setTriggerWidth:function(){console.log("_setTriggerWidth");var e=this.get("trigger"),t=this.element.outerWidth(),n=parseInt(e.css("padding-left"),10),r=parseInt(e.css("padding-right"),10),i=parseInt(e.css("border-left-width"),10),s=parseInt(e.css("border-right-width"),10);e.css("width",t-n-r-i-s)},_tweakAlignDefaultValue:function(){var e=this.get("align");e.baseElement._id==="VIEWPORT"&&(e.baseElement=this.get("trigger")),this.set("align",e)},_trigger_click:function(e){var t=e.data.self;e.preventDefault(),t.get("disabled")||t.show()},destroy:function(){i.each(this._overlays,function(e,t){t.destroy()}),this.element.remove(),u.superclass.destroy.call(this)},select:function(e){var t=l(e,this.options,this.get("multiple")),n=this.get("selectedIndex");this.set("selectedIndex",t);if(n!==t){var r=c(t,this.options);this.trigger("change",r)}return this.hide(),this},syncModel:function(e){return this.model=f(e,this.get("classPrefix")),this.set("multiple",p(this.model.options)),this.renderPartial("[data-role=content]"),this.options=this.$("[data-role=content]").children(),this.set("length",this.options.length),this.set("selectedIndex",-1),this.set("value",""),this.select("[data-selected=true]"),this._setTriggerWidth(),this},getOption:function(e){var t=l(e,this.options,this.get("multiple"));return c(t,this.options)},addOption:function(e){var t=this.model.options;return t.push(e),this.syncModel(t),this},removeOption:function(e){var t=l(e,this.options,this.get("multiple")),n=this.get("selectedIndex"),r=c(t,this.options);return r.remove(),this.options=this.$("[data-role=content]").children(),this.set("length",this.options.length),t===n?this.set("selectedIndex",0):t<n&&this.set("selectedIndex",n-1),this},_onRenderSelectedIndex:function(e){if(e==-1)return;var t=c(e,this.options);console.log("selected",t.get(0));var n=this.currentItem,r=t.attr("data-value");if(n&&t[0]==n[0])return;var s=this.get("selectSource");if(s){var o=s.val();s.val(r),r!==o&&i(s).trigger("change")}if(n&&this.element.has(n)){n.attr("data-selected","false").removeClass(this.get("classPrefix")+"-item-selected");var u=h(l(n,this.options,this.get("multiple")),this.model.options);u&&(u.selected="false")}t.attr("data-selected","true").addClass(this.get("classPrefix")+"-item-selected");var u=h(e,this.model.options);u.selected="true",this.set("value",r);var a=this.get("trigger"),f=a.find("[data-role=trigger-content]"),p=this.get("renderTrigger").call(this,t);console.log("html",p),f.length?f.html(p):a.html(p),this.currentItem=t},_onRenderDisabled:function(e){var t=this.get("classPrefix")+"-disabled",n=this.get("trigger");n[e?"addClass":"removeClass"](t)},_initSubSelectPosition:function(){this._overlays=[];var e=i("li[data-role=item]",this.element),t=this;e.each(function(e,n){n=i(n);var s=n.children("ul");if(s.length>0){var o=new r({element:s,align:{baseElement:n,baseXY:["100%",0],selfXY:[0,0]}});n.data("sub-overlay",o),t._overlays.push(0)}})}});n.exports=u});
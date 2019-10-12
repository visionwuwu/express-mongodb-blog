 // 初始化我们的表单验证
 $.fn.myValidator = function(options, callback, errCallback) {
     // 解构配置参数
     let { message, feedbackIcons, fields } = options

     // 如果没有表单控件或者没有配置fields
     if ($(this).find('input') == null || !fields) {
         return console.log(message);
     }

     let obj = [];

     // 循环配置每个fields字段
     for (var key in fields) {
         // 获取每个表单字段对应的表单控件对应的value值
         let $input = $(this).find(`input[name=${key}]`);

         obj.push($input)

         // 遍历每个表单控件对应的配置项 name age hobbis
         let params = fields[key];

         // 注册blur事件
         $input.on('blur', function() {
             let val = $(this).val().trim();
             // 如果此表单控件为空 配置了notEmpty
             if (params.notEmpty && val == '') {
                 $(this).parent().removeClass('has-success').addClass('has-error')
                 $(this).next().removeClass(feedbackIcons.valid).addClass(feedbackIcons.invalid)
                     .next().text(params.notEmpty.message);
                 return;
             }

             // 如果此表单控件正则不满足 并且配置了正则
             if (params.regexp) {
                 if (!params.regexp.regexp.test(val)) {
                     $(this).parent().removeClass('has-success').addClass('has-error')
                     $(this).next().removeClass(feedbackIcons.valid).addClass(feedbackIcons.invalid)
                         .next().text(params.regexp.message);
                     return;
                 }
             }

             // 长度不满足 并且配置了长度
             if (params.stringLength) {
                 // es6解构赋值
                 let { min, max, message } = params.stringLength;
                 let len = val.length;
                 if (min != undefined && max != undefined) {
                     if (min <= len && len >= max) {
                         $(this).parent().removeClass('has-success').addClass('has-error')
                         $(this).next().removeClass(feedbackIcons.valid).addClass(feedbackIcons.invalid)
                             .next().text(message);
                         return;
                     }
                 }

                 if (min != undefined) {
                     if (len < min) {
                         $(this).parent().removeClass('has-success').addClass('has-error')
                         $(this).next().addClass(feedbackIcons.invalid)
                             .next().removeClass(feedbackIcons.valid).text(message);
                         return;
                     }
                 }

                 if (max != undefined) {
                     if (len > max) {
                         $(this).parent().removeClass('has-success').addClass('has-error')
                         $(this).next().removeClass(feedbackIcons.valid).addClass(feedbackIcons.invalid)
                             .next().text(message);
                         return;
                     }
                 }

             }

             // 所有不为空success验证通过
             $(this).parent().removeClass('has-error').addClass('has-success');
             $(this).next().removeClass(feedbackIcons.invalid).addClass(feedbackIcons.valid).next().text('');

             // 设置为true
             this.flag = true;

         })

     }

     // 
     $(this).submit(function(e) {
         // 默认全部表单控件验证通过
         let isSubmit = true;
         // 遍历每项表单
         obj.forEach(function($item) {
             $item.trigger('blur')
             if (!$item[0].flag) {
                 isSubmit = false;
             }
         });

         console.log(isSubmit)

         // false为所有的表单控件有一项不满足不提交表单
         if (!isSubmit) {
             errCallback && errCallback()
             return false;
         }
         console.log(111);
         // 传入回调函数
         callback && callback(e);
     })
 }
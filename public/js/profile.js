$(function() {
    // 表单验证规则
    let verity = {
        message: '这是一个无效的表单',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            "nickname": {
                notEmpty: {
                    message: '昵称不能为空'
                },
                'regexp': {
                    regexp: /^[\u4E00-\u9FA5A-Za-z]{2,}$/,
                    message: '昵称必须至少俩个中英文',
                },
                required: true, // 必填
            }
        }
    }

    // 表单验证
    $("#profile").myValidator(verity);
});
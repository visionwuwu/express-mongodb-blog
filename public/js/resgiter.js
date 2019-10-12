$(function($) {
    // 表单验证
    let verity = {
        message: '这是一个无效的表单',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            "email": {
                notEmpty: {
                    message: '邮箱不能为空'
                },
                'regexp': {
                    regexp: /^[\w_-]+[@][\w_-]+([.][a-zA-Z]+){1,3}$/,
                    message: '邮箱格式不正确',
                },
                required: true, // 必填
            },
            "nickname": {
                notEmpty: {
                    message: '昵称不能为空'
                },
                'regexp': {
                    regexp: /^[\u4E00-\u9FA5A-Za-z]{2,}$/,
                    message: '昵称必须至少俩个中英文',
                },
                required: true, // 必填
            },
            "password": {
                notEmpty: {
                    message: '密码不能为空'
                },
                regexp: {
                    regexp: /^[a-zA-Z]+\d{0,}$/,
                    message: '密码只能是字母数字且以字母开头'
                },
                stringLength: {
                    min: 6,
                    max: 15,
                    message: '密码长度只能在6-15之间'
                },
                required: true
            }
        }
    }

    // 调用valiador验证函数
    $('#register_form').myValidator(verity, function(e) {
        // 阻止默认的表单提交事件
        e.preventDefault();
        let body = $('#register_form').serializeArray();
        // 发送ajax请求
        $.ajax({
            url: '/resgiter',
            type: 'POST',
            data: body,
            dataType: 'json',
            success(data) {
                // 用户存在
                if (data.code == 1001) {
                    $('.tips').addClass('bg-danger').text(data.message);
                }
            }
        })
    });
})
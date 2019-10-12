$(function() {
    // 表单验证
    let verity = {
        message: '这是一个无效的表单',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
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
            },
            "newpsw": {
                notEmpty: {
                    message: '新密码不能为空'
                },
                regexp: {
                    regexp: /^[a-zA-Z]+\d{0,}$/,
                    message: '新密码只能是字母数字且以字母开头'
                },
                stringLength: {
                    min: 6,
                    max: 15,
                    message: '新密码长度只能在6-15之间'
                },
                required: true
            },
            "surepsw": {
                notEmpty: {
                    message: '新密码不能为空'
                },
                regexp: {
                    regexp: /^[a-zA-Z]+\d{0,}$/,
                    message: '新密码只能是字母数字且以字母开头'
                },
                stringLength: {
                    min: 6,
                    max: 15,
                    message: '新密码长度只能在6-15之间'
                },
                required: true
            }
        }
    }


    $('#admin').myValidator(verity, function(e) {
        // 阻止表单提交使用ajax发送请求
        e.preventDefault();
        // 判断俩次密码输入的是否一致
        if ($('#surepsw').val() !== $('#newpsw').val()) {
            //不相同不提交
            $('#surepsw').parent().removeClass('has-success').addClass('has-error');
            $('#surepsw').next().addClass('has-error').next().text('俩次密码输入不一致！');
            return;
        }
        // 发送ajax请求将表单数据提交
        let body = $('#admin').serializeArray();
        $.ajax({
            url: '/admin',
            type: 'POST',
            data: body,
            dataType: 'json',
            success(data) {
                if (data.code == 1000) {
                    location.href = '/'
                } else {
                    $('.tips').text(data.message);
                }
            }
        })
    })
});
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
    $('#login_form').myValidator(verity, function(e) {
        e.preventDefault();
        let body = $('#login_form').serializeArray();
        $.ajax({
            url: '/login',
            type: 'POST',
            data: body,
            dataType: 'json',
            success(data) {
                if (data.code == 1000) {
                    return location.href = '/';
                }
                if (data.code == 1001) {
                    $('.tips').addClass('bg-danger').text(data.message);
                    $('#login_form').addClass('error');
                }
            }
        });
    }, function() {
        $('#login_form').addClass('error');
    });

    $('button').click(function() {
        $('#login_form').removeClass('error');
    })
})
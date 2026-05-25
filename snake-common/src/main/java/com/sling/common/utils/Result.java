package com.sling.common.utils;

import lombok.Data;

/**
 * 统一响应结果封装
 *
 * <p>所有控制器统一使用此类包装返回值，配合全局异常处理器使用。
 *
 * <pre>
 * // 成功返回
 * return Result.success(data);
 * // 失败返回
 * return Result.fail(400, "参数错误");
 * </pre>
 */
@Data
public class Result<T> {

    public static final int SUCCESS = 200;
    public static final int FAIL = 500;

    /** 状态码 */
    private Integer code;

    /** 提示信息 */
    private String message;

    /** 响应数据 */
    private T data;

    public Result() {}

    public Result(Integer code, String message, T data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    /** 成功（无消息） */
    public static <T> Result<T> success(T data) {
        return new Result<>(SUCCESS, "success", data);
    }

    /** 成功（自定义消息） */
    public static <T> Result<T> success(String message, T data) {
        return new Result<>(SUCCESS, message, data);
    }

    /** 失败（自定义状态码和消息） */
    public static <T> Result<T> fail(Integer code, String message) {
        return new Result<>(code, message, null);
    }

    /** 失败（默认 500） */
    public static <T> Result<T> fail(String message) {
        return new Result<>(FAIL, message, null);
    }
}

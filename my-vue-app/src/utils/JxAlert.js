import Swal from "sweetalert2";
import { vuetify } from '../plugins/vuetify.js'

// 從 themes 取得企業色
function getColors() {
    const colors = vuetify.theme.current.value.colors;
    return {
        primary: colors["primary-base"],
        grayLight: colors["gray-300"] ,
        grayDark: colors["gray-900-dark"] ,
    };
}

// 各類型預設行為：success 自動關閉，其餘需手動確認
const TYPE_DEFAULTS = {
    success: { timer: 1500, showConfirmButton: false },
    error: { timer: 0, showConfirmButton: true },
    warning: { timer: 0, showConfirmButton: true },
    info: { timer: 0, showConfirmButton: true },
};

/**
 * 一般提示
 * @param {'success'|'error'|'warning'|'info'} type
 * @param {string} title
 * @param {object} [options] 內容 text，或任何 SweetAlert2 原生選項（會覆蓋預設值）
 */
function show(type, title, options = {}) {
    const colors = getColors();
    return Swal.fire({
        position: "center",
        icon: type,
        title,
        confirmButtonColor: colors.primary,
        ...(TYPE_DEFAULTS[type] ?? TYPE_DEFAULTS.info),
        ...options,
    });
}

/**
 * 確認對話框
 * @returns {Promise<boolean>} 按確認為 true，其餘（取消、點外面、ESC）為 false
 */
async function confirm(title, options = {}) {
    const {
        text = "",
        icon = "question",
        confirmText = "確定",
        cancelText = "取消",
        showCancel = true,
        ...swalOptions
    } = options;
    const colors = getColors();

    const result = await Swal.fire({
        position: "center",
        icon,
        title,
        text,
        showCancelButton: showCancel,
        confirmButtonText: confirmText,
        cancelButtonText: cancelText,
        confirmButtonColor: colors.primary,
        cancelButtonColor: colors.grayLight,
        didRender: () => {
            const btn = Swal.getCancelButton();
            if (btn) btn.style.color = colors.grayDark;
        },
        ...swalOptions,
    });

    return result.isConfirmed;
}


export const JxAlert = { show, confirm }

export function useAlert() {
    return JxAlert
}
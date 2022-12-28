export interface MenuState {
    showContextMenu: boolean,
    contextMenuTarget: any,
    contextMenuOptions: MenuOption[],
    contextMenuOnClick: ((sel: MenuOption) => void) | null,

    showAlert: boolean,
    alertTitle: string,
    alertMessage: string,
    alertType: string,
    alertOnOk: (() => void) | null,
}
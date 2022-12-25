export interface MenuState {
    show: boolean,
    target: any,
    options: MenuOption[],
    onClick: ((sel: MenuOption) => void) | null,
}
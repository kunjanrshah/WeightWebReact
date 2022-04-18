

export async function SettingConstant () {

    let setting={
        vehicle:'vehicle',
        receiver:'receiver',
        material:'material',
        supplier:'supplier',
        remark:'remark',
        villege:'villege'
    }
    setting=JSON.parse(localStorage.getItem('setting'));
    return setting;
}
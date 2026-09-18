#[derive(serde::Serialize)]
#[serde(rename_all = "camelCase")]
struct OsInfo {
    os: String,
    arch: String,
    family: String,
}

#[tauri::command]
fn get_os_info() -> OsInfo {
    OsInfo {
        os: std::env::consts::OS.to_string(),
        arch: std::env::consts::ARCH.to_string(),
        family: std::env::consts::FAMILY.to_string(),
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_sql::Builder::default().build())
        .invoke_handler(tauri::generate_handler![get_os_info])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

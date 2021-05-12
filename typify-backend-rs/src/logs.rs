use {
    log::*,
    super::constants,
};

///This whole function is a bit nasty. fix at some point. Only works in debug mode.
pub fn start_logger() {
    // Create directory to store logs.
    let directory : std::fs::ReadDir = std::fs::read_dir(constants::LOGS_DIR_NAME).or_else::<std::fs::ReadDir,_>(|x| {
        std::fs::create_dir(constants::LOGS_DIR_NAME).expect(format!("Cannot create logs directory [{}] because {}", constants::LOGS_DIR_NAME, x).as_str());
        Ok(std::fs::read_dir(constants::LOGS_DIR_NAME).expect(format!("Cannot read logs directory [{}]", constants::LOGS_DIR_NAME).as_str()))
    }).expect("Cannot read logs directory. How can this program can create a dir and not be able to access it... weird");

    //If there are too many logfiles, delete the oldest ones.
    //This seems like a bad way of doing it, rewrite this at some point.
    let mut dir_entries: Vec<Result<std::fs::DirEntry, std::io::Error>> = directory.collect();
    if dir_entries.len() >= constants::MAX_AMOUNT_OF_LOGS.into() {
        &dir_entries.sort_by(|a, b| {
            a.as_ref()
                .unwrap()
                .metadata()
                .unwrap()
                .created()
                .unwrap()
                .partial_cmp(&b.as_ref().unwrap().metadata().unwrap().created().unwrap())
                .unwrap() // This is sooooooo nasty.
        });
        let mut old_len = dir_entries.len();
        while old_len >= constants::MAX_AMOUNT_OF_LOGS.into() {
            std::fs::remove_file(dir_entries.first().unwrap().as_ref().unwrap().path()).unwrap();
            dir_entries.remove(0).unwrap();
            old_len -= 1;
        }
    }
    // Create logging facility into stderr.
    let logfile_name = if constants::DEBUG_FILE_NAME_WITH_FULL_TIMESTAMP {
        std::path::PathBuf::from(format!(
            "{}/debug {}.log",
            constants::LOGS_DIR_NAME,
            chrono::Local::now().format("%Y-%m-%d %H:%M:%S").to_string()
        ))
    } else {
        std::path::PathBuf::from(format!("{}/debug.log", constants::LOGS_DIR_NAME))
    };
    simple_logging::log_to_file(logfile_name, LevelFilter::Info).unwrap();
}
use {
    log::*,
    super::constants,
};

///This whole function is a bit nasty. fix at some point. Only works in debug mode.
pub fn log_to_file(amount_of_logs: u16, full_timestamp : bool , path : &std::path::Path) {
    // Create directory to store logs.
    let directory : std::fs::ReadDir = std::fs::read_dir(path).or_else::<std::fs::ReadDir,_>(|x| {
        std::fs::create_dir(path).expect(format!("Cannot create logs directory [{}] because {}", path.to_str().unwrap(), x).as_str());
        Ok(std::fs::read_dir(path).expect(format!("Cannot read logs directory [{}]", path.to_str().unwrap()).as_str()))
    }).expect("Cannot read logs directory. How can this program can create a dir and not be able to access it... weird");

    //If there are too many logfiles, delete the oldest ones.
    //This seems like a bad way of doing it, rewrite this at some point.
    let mut dir_entries: Vec<Result<std::fs::DirEntry, std::io::Error>> = directory.collect();
    if dir_entries.len() >= amount_of_logs.into() {
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
        while old_len >= amount_of_logs.into() {
            std::fs::remove_file(dir_entries.first().unwrap().as_ref().unwrap().path()).unwrap();
            dir_entries.remove(0).unwrap();
            old_len -= 1;
        }
    }
    // Create logging facility into stderr.
    let logfile_name = if full_timestamp {
        std::path::PathBuf::from(format!(
            "{}/debug {}.log",
            path.to_str().unwrap(),
            chrono::Local::now().format("%Y-%m-%d %H:%M:%S").to_string()
        ))
    } else {
        std::path::PathBuf::from(format!("{}/debug.log", path.to_str().unwrap()))
    };
    simple_logging::log_to_file(logfile_name, LevelFilter::Info).unwrap();
}
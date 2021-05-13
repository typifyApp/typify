use {
    log::*,
    serde::{Deserialize, Serialize},
    std::{fs, io, path::Path,io::BufReader,io::BufWriter,io::Read,io::Write},
};

pub fn load_struct_toml<T>(path: &Path) -> T
where
    for<'de> T: Deserialize<'de> + Serialize + Default,
{
    let json_read_result = try_read_toml_file(path);
    match json_read_result {
        Ok(file) => file,
        Err(e) => {
            warn!("Cannot load toml file at [{}] because {}. Creating new toml file with default values...", path.display(),e);
            let default = T::default();

            if let Err(_e) = try_write_toml_file(&default, path) {
                warn!("Cannot create toml file at [{}].", path.display());
                warn!("{}", e);
            }

            default
        }
    }
}

pub fn try_read_toml_file<'a, T>(path: &Path) -> Result<T, Box<dyn std::error::Error>>
where
    for<'de> T: Deserialize<'de>,
{
    let file_handle_result = fs::File::open(path);
    match file_handle_result {
        Ok(file_handle) => {
            let mut buf_reader_handle = BufReader::new(file_handle);
            let mut buf = String::new();
            if let Err(e) = buf_reader_handle.read_to_string(&mut buf){
                error!("Cannot read toml file [{}] because {}",path.to_str().unwrap(),e)
            }
            match toml::from_str(buf.as_str()) {
                Ok(config) => Ok(config),
                Err(e) => {
                    error!("Cannot deserialize contents of the file [{}] because {}",path.to_str().unwrap(),e);
                    Err(e.into())
                }
            }
        }
        Err(e) => Err(e.into()),
    }
}

pub fn try_write_toml_file<T>(config: &T, path: &Path) -> Result<(), Box<dyn std::error::Error>>
where
    T: Serialize,
{
    let file_handle_result = fs::File::create(path);

    match file_handle_result {
        Ok(file_handle) => {
            let mut buf_writer_handle = BufWriter::new(file_handle);
            let buf : String = toml::to_string(config).unwrap();
            buf_writer_handle.write(buf.as_str().as_bytes()).unwrap();
            Ok(())
        }
        Err(e) => Err(e.into()),
    }
}


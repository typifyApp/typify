#!/bin/sh
build_dir="final_build"
static_file_dir="public"
binary="rust-backend"

if [[ -d $build_dir ]]; then
    echo ">> Removing old build in $build_dir"
    rm -r $build_dir/$binary
    echo "Done."
else 
    echo ">> Creating directory $build_dir"
    mkdir $build_dir
fi

# Build frontend and backend
echo ">> Building frontend..."
(cd frontend; npm run build)
echo ">> Building backend..."
(cd rust-backend; cargo build --release)

echo ">> Copying built files into $build_dir"
cp rust-backend/target/release/rust-backend $build_dir/$binary
chmod +x $build_dir/$binary
cp rust-backend/Rocket.toml $build_dir/Rocket.toml
cp rust-backend/run.sh $build_dir/run.sh
cp -r frontend/build $build_dir/$static_file_dir

# TEMP: just copy the debug one:
cp rust-backend/typify.sqlite $build_dir/typify.sqlite
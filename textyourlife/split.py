import os

def split_file(filename, chunk_size_mb=15):
    chunk_size = chunk_size_mb * 1024 * 1024
    if not os.path.exists(filename):
        print(f"Skipping: '{filename}' not found.")
        return 0

    file_size = os.path.getsize(filename)
    print(f"Splitting {filename} ({file_size / (1024*1024):.2f} MB)...")

    part_num = 1
    with open(filename, 'rb') as f:
        while True:
            chunk = f.read(chunk_size)
            if not chunk:
                break
            part_filename = f"{filename}.part{part_num}"
            with open(part_filename, 'wb') as part_file:
                part_file.write(chunk)
            print(f"  -> Created {part_filename}")
            part_num += 1
            
    total_parts = part_num - 1
    print(f"Finished {filename}: {total_parts} parts created.\n")
    return total_parts

if __name__ == "__main__":
    split_file("game.zip", 15)
    split_file("renpy.wasm", 15)
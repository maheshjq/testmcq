#!/bin/bash

# Output file name
OUTPUT_FILE="mcq-app-project.txt"

# Function to create separator
create_separator() {
    local filename=$1
    printf "\n=====\n"
    printf "%s\n" "$filename"
    printf "=======\n"
}

# Function to check if file is binary
is_binary() {
    local file=$1
    if file "$file" | grep -q "text"; then
        return 1  # Not binary
    else
        return 0  # Binary
    fi
}

# Clear or create the output file
> "$OUTPUT_FILE"

# Find all files, excluding .git, node_modules, and other unnecessary directories
find . -type f \
    ! -path "./.git/*" \
    ! -path "./node_modules/*" \
    ! -path "./dist/*" \
    ! -path ".gitignore" \
    ! -path "./coverage/*" \
    ! -path "./$OUTPUT_FILE" \
    ! -name "package-lock.json" \
    ! -name "ecs-definition-web-live.tpl" \
    ! -name "jest.config.js" \
    ! -name "apply_dark_mode.py" \
    ! -name "test.config.js" \
    ! -name "README.md" \
    ! -name "PHP-serialized-format-utility.js" \
    ! -name "Ruby-serialized-format-utility.js" \
    ! -name "auth-login-v1.test.js" \
    ! -name "concatenated_project.txt" \
    ! -name "02-seed_v2.sql" \
    ! -name "03-stored-procedures.sql" \
    ! -name ".babelrc" \
    ! -name ".eslintrc.js" \
    ! -name "my.cnf" \
    ! -name "launch.json" \
    ! -name "deploy.yaml" \
    ! -name "condens.sh" \
    ! -name "copy_files.sh" \
    -print0 | while IFS= read -r -d '' file; do
    
    # Skip binary files
    if is_binary "$file"; then
        echo "Skipping binary file: $file"
        continue
    fi

    # Get relative path
    relative_path=${file#./}
    
    # Create separator with filename
    create_separator "$relative_path" >> "$OUTPUT_FILE"
    
    # Append file contents
    cat "$file" >> "$OUTPUT_FILE"
    
    echo "Processed: $relative_path"
done

echo "Concatenation complete! Output written to: $OUTPUT_FILE"
ls -l "$OUTPUT_FILE"
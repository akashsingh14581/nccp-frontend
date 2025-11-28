### 📁 Excel File Upload Routes

The application provides separate API endpoints to upload Excel files for different categories of members.  
Each route accepts an Excel file and processes the data to insert members into the database.

| Member Type                     | Upload Route                                             |
|--------------------------------|-----------------------------------------------------------|
| Honorary Members               | /upload-honorary-members-Excel-file                      |
| President & Secretary Members  | /upload-president-secretary-members-Excel-file           |
| Executive Members              | /upload-executive-members-Excel-file                    |
| Ordinary Members               | /upload-ordinary-members-Excel-file                     |

---

### 📌 Important Notes

- All routes accept only **Excel files** (`.xlsx` / `.xls`).
- Each route reads the uploaded Excel file and automatically inserts member data into the database.
- **All Excel column headings must be in lowercase.**
  - Example: `name`, `email`, `mobile`, `designation`, `address`, etc.
- The Excel file must follow the required column structure for correct processing.
- Incorrect or missing columns may result in validation errors.
- File size and format are validated before processing.

---

### 📝 Example Excel Structure

Your Excel file should follow this pattern:

| name      | email               | mobile     | designation     | address            |
|-----------|---------------------|-------------|------------------|---------------------|
| John Doe  | johndoe@gmail.com   | 9876543210  | Member           | Delhi, India        |
| Jane Roe  | janeroe@gmail.com   | 9988776655  | Executive Member | Mumbai, India       |

✔ Column names must be lowercase  
✔ No extra symbols, spaces, or special characters in headings  

---

### 📂 Upload Flow

1. Admin selects member type (Honorary / Executive / Ordinary / President & Secretary).  
2. Admin uploads the corresponding Excel file.  
3. The system reads and validates the file.  
4. Valid entries are inserted into the database.  
5. Response returns success or error messages.

---

### ⚠️ Common Errors

- ❌ Uppercase or mismatched column names  
- ❌ Missing required fields  
- ❌ Wrong file type (only `.xlsx` or `.xls` allowed)  
- ❌ Extra empty rows causing parsing issues  

---

This section ensures the admin can easily upload different member categories using Excel files.


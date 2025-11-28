### 📁 Excel File Upload Routes

Application mein different categories ke members ki Excel files upload karne ke liye alag endpoints available hain:

| Member Type                   | Upload Route                                           |
|------------------------------|--------------------------------------------------------|
| Honorary Members             | /upload-honorary-members-Excel-file                    |
| President & Secretary Members| /upload-president-secretary-members-Excel-file         |
| Executive Members            | /upload-executive-members-Excel-file                  |
| Ordinary Members             | /upload-ordinary-members-Excel-file                   |

### 📌 Important Notes
- Sabhi routes Excel (.xlsx / .xls) files accept karte hain.
- Each route uploaded Excel file ko process karke member data database me insert karta hai.
- **Excel sheet ke saare column headings lowercase me hone chahiye.**
  - Example: `name`, `email`, `mobile`, `designation`, `address`, etc.
- Excel file ka column structure required format ke according hona chahiye.

import { connectDB } from "@/lib/db";
import { upload } from "@/lib/multer";
import fs from "fs";

// disable nextjs bodyparser
export const config = {
  api: {
    bodyParser: false,
  },
};

//handler function
export default async function handler(req, res) {
  //create db connection
  const db = await connectDB();
  //get request
  if (req.method === "GET") {
    try {
      //fetch the data from database
      const [rows] = await db.execute("SELECT * FROM schools");
      res.status(200).json({ success: true, data: rows });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, error: "Failed to fetch schools" });
    }
  } else if (req.method === "POST") {
    // Use multer to parse form-data including text fields
    upload.single("image")(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ success: false, error: "Upload failed" });
      }

      const { name, address, city, state, contact, email_id } = req.body;
      const filePath = req.file ? req.file.path : null;

      // Validate required fields
      if (!name || !address || !city || !state || !contact || !email_id) {
        // delete uploaded file
        if (filePath) fs.unlinkSync(filePath);
        return res
          .status(400)
          .json({ success: false, error: "All fields are required" });
      }

      try {
        // Check for existing email
        const [rows] = await db.execute(
          "SELECT * FROM schools WHERE email_id=?",
          [email_id]
        );
        if (rows.length > 0) {
          // delete uploaded file
          if (filePath) fs.unlinkSync(filePath); 
          return res
            .status(400)
            .json({ success: false, error: "Email already registered" });
        }

        // Check if file exists
        if (!req.file) {
          return res
            .status(400)
            .json({ success: false, error: "No file uploaded" });
        }

        const imagePath = "/schoolImages/" + req.file.filename;

        // Insert into database
        const [result] = await db.execute(
          "INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES(?, ?, ?, ?, ?, ?, ?)",
          [name, address, city, state, contact, email_id, imagePath]
        );

        res
          .status(201)
          .json({ success: true, data: result, message: "Created" });
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .json({ success: false, error: "Failed to insert in database" });
      }
    });
  } else {
    res.status(405).json({ success: false, error: "Method not allowed" });
  }
}

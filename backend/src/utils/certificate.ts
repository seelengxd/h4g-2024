import { Activity, User } from "@prisma/client";
import path from "path";
const { PDFDocument, StandardFonts } = require("pdf-lib");
const fs = require("fs");
import fontkit from "@pdf-lib/fontkit";

import { v4 as uuidv4 } from "uuid";

export const createCertificate = async (
  activity: Activity,
  user: User,
  formattedDate: string
) => {
  const pdfTemplate = fs.readFileSync(
    path.join(__dirname, "../../templates/certificate_template.pdf")
  );
  const fontBytes = fs.readFileSync(
    path.join(__dirname, "../../templates/GreatVibes-Regular.ttf")
  );
  const pdfDoc = await PDFDocument.load(pdfTemplate);
  pdfDoc.registerFontkit(fontkit);
  const customFont = await pdfDoc.embedFont(fontBytes);

  const pages = pdfDoc.getPages();

  const name = user.fullName;
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const textWidth = customFont.widthOfTextAtSize(name, 48);
  const textHeight = customFont.heightAtSize(48);
  const page = pages[0];

  page.drawText(name, {
    x: page.getWidth() / 2 - textWidth / 2,
    y: page.getHeight() / 2 - textHeight / 2 + 20,
    size: 48,
    font: customFont,
  });

  const activityText = `Thank you for participating in ${activity.name} on ${formattedDate}.`;
  page.drawText(activityText, {
    x:
      page.getWidth() / 2 -
      helveticaFont.widthOfTextAtSize(activityText, 12) / 2,
    y: page.getHeight() / 2 - helveticaFont.heightAtSize(12) / 2 - 70,
    size: 12,
    font: helveticaFont,
  });

  const pdfBytes = await pdfDoc.save();
  let uuid = uuidv4();
  await fs.writeFile(
    path.join(__dirname, `../../uploads/${uuid}.pdf`),
    pdfBytes,
    () => {}
  );
  return uuid;
};

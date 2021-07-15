import fs from "fs";
import csvParse from 'csv-parse';

class ImportCategoryUseCase{

    execute(file: Express.Multer.File): void{
        const stream    = fs.createReadStream(file.path);
        const parseFile = csvParse({
            delimiter: ";"
        });
        stream.pipe(parseFile);
        parseFile.on("data", async (line) => {
            console.log(line);
        });
        console.log(file);
    }
}

export { ImportCategoryUseCase }
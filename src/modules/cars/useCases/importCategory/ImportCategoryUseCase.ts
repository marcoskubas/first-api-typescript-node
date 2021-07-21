import fs from "fs";
import csvParse from 'csv-parse';
import {CategoriesRepository} from "../../repositories/implementations/CategoriesRepository";
import {ICategoriesRepository} from "../../repositories/ICategoriesRepository";

interface IImportCategory{
    name: string;
    description: string;
}

class ImportCategoryUseCase{

    constructor(private categoriesRepository: ICategoriesRepository) {
    }

    loadCategories(file: Express.Multer.File): Promise<IImportCategory>{
        console.log(file);
        return new Promise((resolve, reject) => {
            const categories: IImportCategory[] = [];
            const stream    = fs.createReadStream(file.path);
            const parseFile = csvParse({
                delimiter: ";"
            });
            stream.pipe(parseFile);
            parseFile.on("data", async (line) => {
                const [name, description] = line;
                categories.push({
                    name,
                    description
                });
            }).on("end", () => {
                fs.promises.unlink(file.path);
                // @ts-ignore
                resolve(categories);
            }).on("error", (err) => {
                reject(err);
            });
        });
    }

    async execute(file: Express.Multer.File): Promise<void>{
        const categories = await this.loadCategories(file);
        // @ts-ignore
        categories.map(async category => {
            const { name, description } = category;
            const existCategory = await this.categoriesRepository.findByName(name);
            console.log('existCategory');
            console.log(existCategory);
            if(!existCategory){
                await this.categoriesRepository.create({name, description});
            }
        });
        console.log(categories);
    }
}

export { ImportCategoryUseCase }
import { ConnectionOptions, createConnection } from "typeorm";
import { importClassesFromDirectories } from 'typeorm/util/DirectoryExportedClassesLoader';
import { Post } from "./entity/Post";
import { getI18nEntities } from "../../src";

const options: ConnectionOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "admin",
    database: "test",
    synchronize: true,
    entities: [
        // We have to load classes before we make connection to the database
        ...importClassesFromDirectories([__dirname + "/entity/*"]),
        // Gets i18n entities classes, which are automagically generated after entity classes are loaded
        ...getI18nEntities()
    ]
};

(async () => {
    const connection = await createConnection(options);
    const postRepository = connection.getRepository(Post);

    async function createNewPost() {
        const post = new Post();
        // no need to initialize title property value, it will be initialized automagically
        post.title.set('en', 'Test');
        await postRepository.save(post);
    }

    async function loadPostUsingQueryBuilder() {
        const result = await postRepository
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.translations', 't')
            .where('p.id = 1 AND t.locale = "en"')
            .getOne();

        if (!result) {
            throw new Error('Post not found');
        }

        console.log(result.title.get("en"));
    }

    async function loadPost() {
        const result = await postRepository.findOne({
            relations: ['translations']
        });

        if (!result) {
            throw new Error('Post not found');
        }

        console.log(result.title.get("en"));
    }

    await createNewPost();
    await loadPostUsingQueryBuilder();
    await loadPost();

})();
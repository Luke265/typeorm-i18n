import { ConnectionOptions, createConnection, SimpleConsoleLogger } from "typeorm";
import { importClassesFromDirectories } from 'typeorm/util/DirectoryExportedClassesLoader';
import { Post } from "./entity/Post";
import { buildI18nEntities, i18nEntityOf } from "../../src";

const options: ConnectionOptions = {
    type: "mysql",
    host: "192.168.0.4",
    port: 3306,
    username: "root",
    password: "labas",
    database: "test",
    synchronize: true,
    logging: true,
    entities: [
        // We have to load classes before we make connection to the database
        ...importClassesFromDirectories(new SimpleConsoleLogger(), [__dirname + "/entity/*"]),
        // Builds i18n entities from collected metadata
        ...buildI18nEntities()
    ]
};

(async () => {
    const connection = await createConnection(options);
    const postRepository = connection.getRepository(Post);
    const postTranslationRepository = connection.getRepository(i18nEntityOf(Post));

    async function createNewPost() {
        const post = new Post();
        // no need to initialize title property value, it will be initialized automagically
        const entity = post.title.set('en', 'Test');
        await postRepository.save(post);
        // you can save just one or all translation entities
        await postTranslationRepository.save(entity);
        //await postTranslationRepository.save(post.translations);
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
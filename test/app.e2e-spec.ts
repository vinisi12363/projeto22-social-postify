        import { Test, TestingModule } from '@nestjs/testing';
        import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
        import * as request from 'supertest';
        import { AppModule } from './../src/app.module';
        import { describe } from 'node:test';
        import { PrismaService } from 'src/prisma/prisma.service';
        import { MediaFactory } from './factories/medias.factory';
        import { PostFactory } from './factories/posts.factory';
        import { PublicationFactory } from './factories/publications.factory';

        let app: INestApplication;
        let prisma: PrismaService;

        beforeEach(async () => {
          const moduleFixture: TestingModule = await Test.createTestingModule({
              imports: [AppModule],
          }).overrideProvider(PrismaService).useValue(prisma).compile();

          app = moduleFixture.createNestApplication();
          app.useGlobalPipes(new ValidationPipe());
          prisma = app.get(PrismaService);

          await prisma.publication.deleteMany();
          await prisma.media.deleteMany();
          await prisma.post.deleteMany();

          await app.init();
        });

describe('AppController (e2e)', () => {
          const strangeArgument = "strangeArgument";
          it('/health => should get an alive message', () => {
            return request(app.getHttpServer())
              .get('health')
              .expect(HttpStatus.OK)
              .expect("I'm okay!");
          });
          const mediasRoute = `/medias/`;
          const mediasHealthRoute = `/medias/health`;

      describe("/medias integration tests", () => {
        it("GET /health => should get an alive message from medias", async () => {
                  const { status, text } = await request(app.getHttpServer())
                      .get(`${mediasHealthRoute}`);
                  expect(status).toBe(HttpStatus.OK);
                  expect(text).toBe("Medias online!")
        });
      
        it("POST /medias => should create a media data; status code 200", async () => {

                const postBody = await new MediaFactory().criarMediaFaker();

                const { status } = await request(app.getHttpServer())
                    .post(`${mediasRoute}`)
                    .send({
                        title: postBody.title,
                        username: postBody.username
                    });

            const mediaReturn = await prisma.media.findFirst({
                where: {
                    title: postBody.title,
                    username: postBody.username
                }
            })

            expect(mediaReturn).toEqual(
                expect.objectContaining(
                    postBody
                )
            )
            expect(status).toBe(HttpStatus.CREATED);
        });
      
        it("POST /medias => should return status code 400 title missing", async () => {

            const postBody = await new MediaFactory().criarMediaFaker();

            const { status } = await request(app.getHttpServer())
                .post(`${mediasRoute}`)
                .send({
                    username: postBody.username
                });
            expect(status).toBe(HttpStatus.BAD_REQUEST);
        });

        it("POST /medias => should return status code 400 username missing", async () => {

            const postBody = await new MediaFactory().criarMediaFaker();

            const { status } = await request(app.getHttpServer())
                .post(`${mediasRoute}`)
                .send({
                    title: postBody.title
                });
            expect(status).toBe(HttpStatus.BAD_REQUEST);
        });

        it("POST /medias => should return status code 400 strange keys in body object", async () => {

            const postBody = await new MediaFactory().criarMediaFaker();

            const { status } = await request(app.getHttpServer())
                .post(`${mediasRoute}`)
                .send({
                    title: postBody.title,
                    username: postBody.username,
                    strangeArgument
                });
            expect(status).toBe(HttpStatus.BAD_REQUEST);
        });

        it("POST /medias => should return status code 400 title need to be a string", async () => {

            const postBody = await new MediaFactory().criarMediaFaker();

            const responseNumber = await request(app.getHttpServer())
                .post(`${mediasRoute}`)
                .send({
                    title: 0,
                    username: postBody.username
                });
            expect(responseNumber.status).toBe(HttpStatus.BAD_REQUEST);

            const responseBooleanTrue = await request(app.getHttpServer())
                .post(`${mediasRoute}`)
                .send({
                    title: true,
                    username: postBody.username
                });
            expect(responseBooleanTrue.status).toBe(HttpStatus.BAD_REQUEST);

            const responseBooleanFalse = await request(app.getHttpServer())
                .post(`${mediasRoute}`)
                .send({
                    title: false,
                    username: postBody.username
                });
            expect(responseBooleanFalse.status).toBe(HttpStatus.BAD_REQUEST);

            const responseArray = await request(app.getHttpServer())
                .post(`${mediasRoute}`)
                .send({
                    title: [],
                    username: postBody.username
                });
            expect(responseArray.status).toBe(HttpStatus.BAD_REQUEST);

            const responseObject = await request(app.getHttpServer())
                .post(`${mediasRoute}`)
                .send({
                    title: {},
                    username: postBody.username
                });
            expect(responseObject.status).toBe(HttpStatus.BAD_REQUEST);

            const responseUndefined = await request(app.getHttpServer())
                .post(`${mediasRoute}`)
                .send({
                    title: undefined,
                    username: postBody.username
                });
            expect(responseUndefined.status).toBe(HttpStatus.BAD_REQUEST);

            const responseNull = await request(app.getHttpServer())
                .post(`${mediasRoute}`)
                .send({
                    title: null,
                    username: postBody.username
                });
            expect(responseNull.status).toBe(HttpStatus.BAD_REQUEST);
        });

        it("GET /medias => should return an array media data when with data; status code 200", async () => {

          await new MediaFactory().criarVariasMediasDBFaker(prisma);

          const { status, body } = await request(app.getHttpServer())
              .get(`${mediasRoute}`);
          expect(status).toBe(HttpStatus.OK);
          expect(Array.isArray(body)).toBe(true);
          expect(body).toHaveLength(2)
          expect(body).toEqual((
              expect.arrayContaining(body)
          ))
        });

        it("GET /medias => should return an empty array when without data; status code 200", async () => {
          const { status, body } = await request(app.getHttpServer())
              .get(`${mediasRoute}`);
          expect(status).toBe(HttpStatus.OK);
          expect(body).toEqual(
              expect.arrayContaining([])
          );
          expect(body).toHaveLength(0);
        });

        it("GET /medias:id => should return an object media data if data exists", async () => {
          const newMedia = await new MediaFactory().criarMediaDBFaker(prisma);

          const { status, body } = await request(app.getHttpServer())
              .get(`${mediasRoute}${newMedia.id}`);
          expect(status).toBe(HttpStatus.OK);
          expect(body).toEqual(
              expect.objectContaining(newMedia)
          );
        });

        it("GET /medias:id => should return status code 404 when media by id not found", async () => {

          await new MediaFactory().criarMediaDBFaker(prisma);

          const lastMediaInDB = await prisma.media.findFirst({
              select: {
                  id: true
              },
              orderBy: {
                  id: 'desc'
              }
          });

          const { status } = await request(app.getHttpServer())
              .get(`${mediasRoute}${lastMediaInDB.id + 10}`);
          expect(status).toBe(HttpStatus.NOT_FOUND);
        });
        it("PUT /medias/:id => should return status code 400 title empty", async () => {

          const newMedia = await new MediaFactory().criarMediaDBFaker(prisma);

          const updateNewData = await new MediaFactory().criarMediaFaker();

          const { status } = await request(app.getHttpServer())
              .patch(`${mediasRoute}${newMedia.id}`)
              .send({
                  title: "",
                  username: updateNewData.username
              });
          expect(status).toBe(HttpStatus.BAD_REQUEST);
        });
      });

      const postsRoute = `/posts/`;
      const postsHealthRoute = `/posts/health`;
      describe("/posts integration tests", () => {
        it("GET /health => should get an alive message from posts", async () => {
          const { status, text } = await request(app.getHttpServer())
              .get(`${postsHealthRoute}`);
          expect(status).toBe(HttpStatus.OK);
          expect(text).toBe("Posts online!")
        });
        it("POST /posts => should return status code 400 title missing", async () => {
          const postBody = await new PostFactory().criarPostComImagemFaker();
          delete postBody.title;

          const { status } = await request(app.getHttpServer())
              .post(`${postsRoute}`)
              .send(postBody);
          expect(status).toBe(HttpStatus.BAD_REQUEST);
         });

        it("POST /posts => should create a post data without image; status code 200", async () => {
              const postBody = await new PostFactory().criarPostComImagemFaker();

              const { status } = await request(app.getHttpServer())
                  .post(`${postsRoute}`)
                  .send(postBody);

              const postExists = await prisma.post.findFirst({
                  where: postBody
              })
              expect(status).toBe(HttpStatus.CREATED);
              expect(postExists).toEqual(
                  expect.objectContaining({
                      id: expect.any(Number),
                      ...postBody
                  })
              )
        

        it("POST /posts => should return status code 400 title missing", async () => {
          const postBody = await new PostFactory().criarPostComImagemFaker();
          delete postBody.title;

          const { status } = await request(app.getHttpServer())
              .post(`${postsRoute}`)
              .send(postBody);
          expect(status).toBe(HttpStatus.BAD_REQUEST);
        });
        it("GET /posts => should return an array post data when with data; status code 200", async () => {
          await new PostFactory().criarVariosPostsComImagemDBFaker(prisma)

          const { status, body } = await request(app.getHttpServer())
              .get(`${postsRoute}`);
          expect(status).toBe(HttpStatus.OK);
          expect(body).toEqual(
              expect.arrayContaining(body)
          );
          expect(body).toHaveLength(2)
        });
        it("PUT /posts/:id => should update a post data without image; status code 200", async () => {
          const newPost = await new PostFactory().criarPostComImagemDBFaker(prisma);

          const updatePostData = await new PostFactory().criarPostComImagemFaker();

          const { status } = await request(app.getHttpServer())
              .patch(`${postsRoute}${newPost.id}`)
              .send(updatePostData);

          const updatedPost = await prisma.post.findFirst({
              where: updatePostData
          })

          expect(status).toBe(HttpStatus.OK);
          expect(updatedPost).toEqual(
              expect.objectContaining({
                  id: expect.any(Number),
                  ...updatePostData
              })
          )
        });

        it("DELETE /posts/:id => should return 404 not found post", async () => {
          await new PostFactory().criarPostComImagemDBFaker(prisma);

          const lastPostInDB = await prisma.post.findFirst({
              select: {
                  id: true
              },
              orderBy: {
                  id: 'desc'
              }
          });

          const { status } = await request(app.getHttpServer())
              .delete(`${postsRoute}${lastPostInDB.id + 10}`);
          expect(status).toBe(HttpStatus.NOT_FOUND);
        });

       
        });
        it("GET /posts => should return an array post data when with data; status code 200", async () => {
          await new PostFactory().criarVariosPostsComImagemDBFaker(prisma);

          const { status, body } = await request(app.getHttpServer())
              .get(`${postsRoute}`);
          expect(status).toBe(HttpStatus.OK);
          expect(body).toEqual(
              expect.arrayContaining(body)
          );
          expect(body).toHaveLength(2)
      });

      });

        const publicationsRoute = `/publication/`;
        const publicationsHealthRoute = `/publications/health`;
        const publicationsPublishedFilterFalse = `published=false`;
        const publicationsPublishedFilterTrue = `published=true`;

        const date = new Date();
        const year = date.getFullYear();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const today = `${year}-${month}-${day}`;
        const publicationsAfterTodayDate = `after=${new Date(today)}`;

        const publicationsOldDate1 = `1500-05-05`;
        const publicationsOldDate2 = `1600-05-05`;
        const publicationsAfterOldDate = `after=${publicationsOldDate1}`;
        const publicationFutureDate1 = `3050-05-05`;
        const publicationFutureDate2 = `3100-05-05`;
        const publicationsAfterFutureDate = `after=${publicationFutureDate1}`;
        describe("/publications integration tests", () => {
          
          const date = new Date();
          const year = date.getFullYear();
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0'); 
          const today = `${year}-${month}-${day}`;
          it("GET /health => should get an alive message from publications", async () => {
              const { status, text } = await request(app.getHttpServer())
                  .get(`${publicationsHealthRoute}`)
              expect(status).toBe(HttpStatus.OK);
              expect(text).toBe("Publications online!")
          });

          it("POST /publications => should create a publication data; status code 200", async () => {

              const newMedia = await new MediaFactory().criarMediaDBFaker(prisma);

              const newPost = await new PostFactory().criarPostComImagemDBFaker(prisma);

              const { status } = await request(app.getHttpServer())
                  .post(`${publicationsRoute}`)
                  .send({
                      mediaId: newMedia.id,
                      postId: newPost.id,
                      date: publicationFutureDate1
                  });
              expect(status).toBe(HttpStatus.CREATED);
          });

          it("POST /publications => should return status code 400 mediaId missing", async () => {

              await new MediaFactory().criarMediaDBFaker(prisma);

              const newPost = await new PostFactory().criarPostComImagemDBFaker(prisma);

              const { status } = await request(app.getHttpServer())
                  .post(`${publicationsRoute}`)
                  .send({
                      postId: newPost.id,
                      date: publicationFutureDate1
                  });
              expect(status).toBe(HttpStatus.BAD_REQUEST);
          });

          it("POST /publications => should return status code 400 postId missing", async () => {
              const newMedia = await new MediaFactory().criarMediaDBFaker(prisma);

              await prisma.post.create({
                  data: {
                      title: "string title",
                      text: "string text"
                  }
              })

              const { status } = await request(app.getHttpServer())
                  .post(`${publicationsRoute}`)
                  .send({
                      mediaId: newMedia.id,
                      date: publicationFutureDate1
                  });
              expect(status).toBe(HttpStatus.BAD_REQUEST);
          });

        });
      
});
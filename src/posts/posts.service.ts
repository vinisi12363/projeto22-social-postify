import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsRepository } from './repository/posts.repository';
import { PublicationsRepository } from 'src/publication/repository/publications.repository';
import { NotFoundPostException, ForbiddenPostException } from './exceptions/posts.exceptions';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository, private readonly publicationsRepository: PublicationsRepository ) { }
  
  async create(body: CreatePostDto): Promise<void> {
    await this.postsRepository.addNewPost(body);
  }

  async findAll(): Promise<CreatePostDto[]> {
    const AllPosts = await this.postsRepository.getAllPosts();

    const PostsWithoutNullImages: CreatePostDto[] = AllPosts.map((post) => {
        if (post.image === null) {
            const objWithoutImage = {
                id: post.id,
                title: post.title,
                text: post.text
            }
            return objWithoutImage;
        }
        return post;
    });
    return PostsWithoutNullImages;
  }

  async getPostById(id: number): Promise<CreatePostDto> {
      let postExist = await this.postsRepository.getPostById(id);
      if (!postExist) {
          throw new NotFoundPostException(id);
      }
      if (postExist.image === null) {
          const postWithouNullImage = {
              id: postExist.id,
              text: postExist.text,
              title: postExist.title
          }
          postExist = postWithouNullImage;
      }
      return postExist;
  }

  async updatePostById(id: number, postBody: CreatePostDto): Promise<void> {
      await this.postsRepository.updatePostById(id, postBody);
  }

  async deletePostById(id: number): Promise<void> {
      await this.getPostById(id);
      const publicationExists = await this.publicationsRepository.getPublicationByPostId(id);
      if (publicationExists?.postId === id) {
          throw new ForbiddenPostException(id, publicationExists.id);
      }
      await this.postsRepository.deletePostById(id);
  }

}

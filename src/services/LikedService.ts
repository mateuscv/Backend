import { Response as res } from 'express';
import { getRepository } from 'typeorm';

import UserVideo from '../models/UserVideo';
import User from '../models/User';

import checkJwt from '../middlewares/checkJwt';

interface Request {
	token: string;
	video_id: string;
	liked: Int16Array;
}

class LikedService {
	public async execute({ token, video_id, liked }: Request): Promise<object> {
		try {
			const videoUserRepository = getRepository(UserVideo);
			const user_id = checkJwt(token).sub;

			const videoInfo = await videoUserRepository.findOne({
				where: { user_id: user_id, video_id: video_id },
			});
			if (videoInfo) {
				console.log(videoInfo);
				const is_liked = await videoUserRepository.save({
					id: videoInfo.id,
					liked,
				});
				const Data = {
					status: 1,
				};

				return Data;
			} else {
				throw new Error('Erro ao resgatar repositório.');
			}
		} catch (err) {
			throw new Error(err);
		}
	}
}

export default LikedService;

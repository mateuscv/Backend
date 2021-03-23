import { Response as res } from 'express';
import { getRepository } from 'typeorm';

import PlaylistVideo from '../../models/PlaylistVideo';

import checkJwt from '../../middlewares/checkJwt';

interface Request {
	playlist_id: string;
	video_id: string;
}

class RemoveVideoService {
	public async execute({ playlist_id, video_id }: Request): Promise<object> {
		try {
			const playVideoRepository = getRepository(PlaylistVideo);

			if (playVideoRepository) {
				const data = await playVideoRepository.findOne({
					where: { playlist_id: playlist_id, video_id },
				});
				await playVideoRepository.delete({
					id: data?.id,
				});
				return { status: 1 };
			} else {
				throw new Error('Erro ao resgatar repositório.');
			}
		} catch (err) {
			throw new Error(err);
		}
	}
}

export default RemoveVideoService;

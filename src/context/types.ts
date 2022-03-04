export interface VideoProps {
	addAt: string;
	description: string;
	displayName: string;
	fullName: string;
	publishedAt: string;
	title: string;
	userId: string;
	userPhoto: string;
	likes: number;
	unlikes: number;
	videoId: string;
	liked: string[];
	unliked: string[];
}

export interface DataProps {
	data: VideoProps[]
}

export interface VideosPropsArray {
  video:VideoProps
}

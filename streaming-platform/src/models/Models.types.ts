
export class EpisodeModel {
    constructor(
        public id: number = 0,
        public name: string = '',
        public description: string = '',
        public number: number = 0,
        public path: string = '',
        public image: string = '',
        // public subtitlePath: Array<Subtitles> = []
    ) { }

    // getEpisodeInfo(): string {
    //     return `Episode ${this.number}: ${this.name}`;
    // }

    // getSubtitleLanguages(): string[] {
    //     return this.subtitlePath.map(subtitle => subtitle.language);
    // }
}

export class Genres {
    constructor(
        public name: string,
    ) { }
}

export class ShowModel {
    constructor(
        public id: number = 0,
        public name: string = '',
        public description: string = '',
        public percentage: number = 0,
        public stars: number = 0,
        public image: string = '',
        public banner: string = '',
        public episodes: Array<EpisodeModel> = [],
        public showId: number = 0,
        public genres: Genres[] = [],
        public seasons: Season[] = []
    ) { }

    // getShowInfo(): string {
    //     return `${this.name}: ${this.description}`;
    // }

    // getEpisodeCount(): number {
    //     return this.episodes.length;
    // }

    // getStars(): string {
    //     return `Rated ${this.stars} stars`;
    // }
}


export class Season {
    constructor(
        public name: string = '',
        public episodes: EpisodeModel[] = [],
        public poster_path: string = '',
        public season_number: number = 0,
        public is_set: boolean = false,
    ) { }
}


export type ShowInfo = {
    id: number,
    name: string,
    description: string,
    genres: Array<string>
}

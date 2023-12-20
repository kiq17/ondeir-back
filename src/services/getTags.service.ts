import Places from "../models/Places"


export const getTagsService = async () => {
    const tags = await Places.find({}, {
        tags: 1,
        _id: 0
    });

    const distinctTags = tags.map(item=> [... new Set(item.tags)]).flat()

    return [... new Set(distinctTags)];
}
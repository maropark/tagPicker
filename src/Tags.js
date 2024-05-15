import * as React from "react";
import { fetchTags, fetchUserTags, assignUserTag, removeUserTag } from "./api";
import TagPicker from "./components/tags/tagPicker";

export function UserTags({ user }) {
  const [allTags, setAllTags] = React.useState(null);
  const [userTags, setUserTags] = React.useState(null);
  const [userTagObjects, setUserTagObjects] = React.useState(null);

  React.useEffect(() => {
    async function getUserTags() {
      const [allTags, userTags] = await Promise.all([
        fetchTags(),
        fetchUserTags(user.uuid)
      ]);
      setAllTags(allTags);
      setUserTags(userTags);
    }
    getUserTags();
  }, [user]);

  const mapTags = () => {
      if (!userTags) return;
      setUserTagObjects(
        userTags.map((tagId) => allTags.find((tag) => tag.uuid === tagId))
      );
  };
  
  React.useEffect(() => {
    mapTags();
  }, [user, allTags, userTags]);

  const handleAssignTag = async (tagUuid) => {
    try {
      await assignUserTag(user.uuid, tagUuid);
      const newUserTags = await fetchUserTags(user.uuid);
      setUserTags(prevUserTags => newUserTags);
      mapTags();
    } catch (error) {
      console.error('Error assigning tag:', error);
    }
  };

  const handleRemoveTag = async (tagUuid) => {
    try {
      await removeUserTag(user.uuid, tagUuid);
      const newUserTags = await fetchUserTags(user.uuid);
      console.log(newUserTags)
      setUserTags(newUserTags);
      mapTags();
    } catch (error) {
      console.error('Error removing tag:', error);
    }
  };

  if (!userTagObjects) return null;

  return (
    <div>
      <TagPicker user={user} initialTags={userTagObjects} allTags={allTags} userTags={userTags} onTagAssigned={handleAssignTag} onTagRemoved={handleRemoveTag}/>
    </div>
  );
}

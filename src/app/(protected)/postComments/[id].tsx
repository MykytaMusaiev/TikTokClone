import {
  createComment,
  fetchCommentsById,
} from '@/services/comments';
import { useAuthStore } from '@/stores/useAuthStore';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Alert,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

export default function PostComments() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [commentText, setCommentText] = useState<string>('');
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();

  const { data: comments, isLoading } = useQuery({
    queryKey: ['comments', id],
    queryFn: () => fetchCommentsById(id),
    enabled: !!id,
  });

  const { mutate: addComment, isPending } = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', id] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      setCommentText('');
    },
    onError: () => {
      Alert.alert('Error', 'Unexpected Error Occured.');
    },
  });

  const addNewComment = () => {
    if (!id || !user || !commentText.trim()) return;

    addComment({
      post_id: id,
      user_id: user?.id,
      comment: commentText.trim(),
    });
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={comments || []}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.commentAuthor}>
                {item.user.username}
              </Text>
              <Text style={styles.commentText}>{item.comment}</Text>
            </View>
          )}
          contentContainerStyle={styles.contentContainerStyles}
        />
      )}
      <View style={styles.commentControlsContainer}>
        <TextInput
          placeholder="Add a comment..."
          value={commentText}
          onChangeText={setCommentText}
          placeholderTextColor="gray"
          style={styles.commentField}
          editable={!isPending}
        />
        <TouchableOpacity
          style={styles.commentButton}
          onPress={addNewComment}
          disabled={isPending || !commentText.trim()}
        >
          <Text style={styles.commentButtonText}>
            {isPending ? 'Posting...' : 'Post'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 15,
    gap: 20,
  },
  commentField: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    color: '#fff',
  },
  commentButton: {
    backgroundColor: '#ff0050',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  commentButtonText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  commentAuthor: {
    color: '#969696ff',
  },
  commentText: {
    color: '#fff',
  },
  contentContainerStyles: {
    gap: 10,
  },
  commentControlsContainer: {
    marginBottom: 50,
  },
});

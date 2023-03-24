import React, { useState } from "react";
import {
  Input,
  Box,
  Button,
  HStack,
  Icon,
  Pressable,
  Text,
  Image,
} from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS } from "../constants";
import * as ImagePicker from "expo-image-picker";
export default function AddImage() {
  const [imageUri, setImageUri] = useState(null);

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access camera roll is required!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  return (
    <Box>
      <Pressable paddingX={70} paddingY={2} onPress={takePhoto}>
        <Box >
          <HStack>
            <Icon
              as={<FontAwesome name="camera" />}
              size="md"
              color={COLORS.primary}
              marginRight={4}
            />
            <Text fontFamily="Regular" fontSize="17 px" color="#35609C">
              {imageUri ? (
                <Box>
                <Image
                  source={{ uri: imageUri }}
                  style={{ width: 300, height: 150 }}
                  alt="Selected Image"
                  marginTop={130}
                />
                </Box>
              ) : (
                "เพิ่มรูปภาพ"
              )}
            </Text>
          </HStack>
        </Box>
      </Pressable>
    </Box>
  );
}

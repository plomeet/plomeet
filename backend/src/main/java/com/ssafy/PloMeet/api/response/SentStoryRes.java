package com.ssafy.PloMeet.api.response;

/**
 * 예시 - Entity에서 가공이 필요한 경우 이런식으로 생성
 */

//import com.ssafy.sayeon.model.entity.SentStory;
//import com.ssafy.sayeon.model.entity.SentStory.ImageType;
//
//import io.swagger.annotations.ApiModel;
//import io.swagger.annotations.ApiModelProperty;
//import lombok.Builder;
//import lombok.Getter;
//import lombok.ToString;
//
//@Builder
//@Getter
//@ToString
//@ApiModel("SentStoryResponse")
public class SentStoryRes {
//    @ApiModelProperty(name = "storyId")
//    String storyId;
//
//    @ApiModelProperty(name = "senderId")
//    String senderId;
//
//    @ApiModelProperty(name = "senderNickname")
//    String senderNickname;
//
//    @ApiModelProperty(name = "dateSent")
//    String dateSent;
//
//    @ApiModelProperty(name = "image")
//    String image;
//
//    @ApiModelProperty(name = "imageType")
//    String imageType;
//
//    public static List<SentStoryRes> of(List<SentStory> sentstories){
//        List<SentStoryRes> result = new LinkedList<SentStoryRes>();
//
//        //MINI, WIDE, SQUARE
//        for(SentStory story : sentstories) {
//            String imageTypeName = "";
//            switch(story.getImageType()) {
//                case MINI:
//                    imageTypeName = ImageType.MINI.name();
//                    break;
//                case WIDE :
//                    imageTypeName = ImageType.WIDE.name();
//                    break;
//                case SQUARE :
//                    imageTypeName = ImageType.SQUARE.name();
//                    break;
//
//            }
//            result.add(SentStoryRes.builder()
//                    .storyId(story.getStoryId())
//                    .senderId(story.getSender().getUserId())
//                    .senderNickname(story.getSender().getMemberProfile().getNickname())
//                    .dateSent(story.getDateSent())
//                    .image(story.getImage())
//                    .imageType(imageTypeName)
//                    .build());
//        }
//
//        return result;
//    }
}

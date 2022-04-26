package main.java.com.ssafy.PloMeet.api.controller;

public class MyController {
    /** AdvancedResponseBody 사용 예시 */
//    @GetMapping("")
//    @ApiOperation(value = "특정 유저 정보 조회", response = Member.class)
//    @ApiResponses({ @ApiResponse(code = 200, message = "유저 정보 조회 성공"),
//            @ApiResponse(code = 400, message = "존재하지 않는 유저입니다."), @ApiResponse(code = 500, message = "서버 오류") })
//    public ResponseEntity<? extends BaseResponseBody> readUserInfo(@RequestHeader(value = "userId") String userId) {
//        return ResponseEntity.status(200)
//                .body(AdvancedResponseBody.of(200, "유저 정보 조회 성공", memberService.getMemberByUserId(userId)));
//    }
    /** BaseResponseBody 사용 예시 */
//    @PutMapping("/nickname")
//    @ApiOperation(value = "닉네임 수정")
//    @ApiResponses({ @ApiResponse(code = 200, message = "닉네임 수정 성공"),
//            @ApiResponse(code = 400, message = "존재하지 않는 유저입니다."), @ApiResponse(code = 500, message = "서버 오류") })
//    public ResponseEntity<? extends BaseResponseBody> modifyNickname(HttpServletRequest request,
//                                                                     @RequestBody UserProfileUpdateReq updateInfo) {
//
//        Member member = jwtTokenUtil.getMemberFromToken(request.getHeader("Authorization"));
//
//        if (!member.getMemberProfile().getNickname().equals(updateInfo.getNickname()) // 기존 닉네임과 다른 경우(변동사항이 있는 경우)
//                && memberService.getMemberProfileByNickname(updateInfo.getNickname()) != null) { // 닉네임 중복 검사
//            return ResponseEntity.status(409).body(BaseResponseBody.of(409, "이미 등록된 닉네임입니다."));
//        }
//
//        myInfoService.modifyUserProfile(member.getUserId(), updateInfo);
//        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "닉네임 수정 성공"));
//    }

//    @GetMapping("/sent")
//    @ApiOperation(value = "보낸 사연함 조회")
//    @ApiResponses({ @ApiResponse(code = 200, message = "보낸 사연함 조회 성공"), @ApiResponse(code = 500, message = "서버 오류") })
//    public ResponseEntity<? extends BaseResponseBody> getSentStory(HttpServletRequest request,
//                                                                   @RequestParam @ApiParam(value = "가져올 페이지", required = true) Integer page,
//                                                                   @RequestParam @ApiParam(value = "한 페이지당 개수", required = true) Integer size) {
//
//        Member member = jwtTokenUtil.getMemberFromToken(request.getHeader("Authorization"));
//
//        Page<SentStory> sentStoryList = storyListService.getSentStoryByPageRequest(member, page, size);
//
//        return ResponseEntity.status(200).body(new AdvancedResponseBody<List<SentStoryRes>>(200, "보낸 사연함 조회 성공", SentStoryRes.of(sentStoryList.getContent())));
//
//    }



}

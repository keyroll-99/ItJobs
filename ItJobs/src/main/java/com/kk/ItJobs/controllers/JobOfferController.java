package com.kk.ItJobs.controllers;

import com.kk.ItJobs.Dto.BaseResponse;
import com.kk.ItJobs.Dto.jobOffer.CreateUpdateJobOfferRequest;
import com.kk.ItJobs.Dto.jobOffer.JobOfferResponse;
import com.kk.ItJobs.service.jobOffer.JobOfferService;
import com.kk.ItJobs.service.user.UserService;
import com.kk.ItJobs.utils.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/job-offer")
public class JobOfferController {
    private JwtUtils jwtUtils;
    private JobOfferService jobOfferService;
    private UserService userService;

    @GetMapping("/{uuid}")
    public BaseResponse<JobOfferResponse> getJobOffer(
            @PathVariable(name = "uuid") String uuid
    ) {
        return jobOfferService.getJobOfferByUuid(uuid);
    }

    @GetMapping("/")
    public BaseResponse<List<JobOfferResponse>>getListOffer(
            @RequestParam(name = "page", defaultValue = "1") Integer page,
            @RequestParam(name = "size", defaultValue = "30") Integer size
    ){
        return jobOfferService.getJobOffer(page, size);
    }

    @PostMapping("/")
    public BaseResponse<JobOfferResponse> createJobOffer(
            @RequestBody CreateUpdateJobOfferRequest createForm,
            HttpServletRequest request
    ) {
        var user = userService.getUser(jwtUtils.getUsernameFromRequest(request));
        return jobOfferService.createJobOffer(createForm, user);
    }

    @PostMapping("/update/{uuid}")
    public BaseResponse<JobOfferResponse> updateJobOffer(
            @RequestBody CreateUpdateJobOfferRequest updateForm,
            @PathVariable(name = "uuid") String uuid,
            HttpServletRequest request
    ) {
        var user = userService.getUser(jwtUtils.getUsernameFromRequest(request));
        return jobOfferService.updateJobOffer(updateForm, uuid, user);
    }
}
export const loadVerifyEmailTemplate = ({ verifyCode }) => {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="google" value="notranslate">
    <title>Jobhopin</title>
    <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans&display=swap" rel="stylesheet">
  
  <style>
    /* -------------------------------------
        GLOBAL RESETS
    ------------------------------------- */
    body {
        -webkit-font-smoothing: antialiased;
        margin: 0;
        padding: 0;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        height: 100%;
        width: 100%;
    }

    table {
        border-collapse: separate;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
        width: 100%;
        font-weight: normal;
        font-style: normal;
        font-family: 'Nunito Sans', sans-serif;
    }

    table td {
        vertical-align: top;
        font-family: 'Nunito Sans', sans-serif;
        font-size: 16px;
    }

    a {
        text-decoration: none;
    }

    a:-webkit-any-link {
        color: #1B1C1B;
    }


    /* -------------------------------------
        BODY & CONTAINER
    ------------------------------------- */

    .body {
        height: 100%;
        background-color: #F2F2F2;
    }

    .container {
        display: block;
        margin: 1% auto !important;
        padding: 20px 42px;
        max-width: 600px;
        background-color: #ffffff;
        box-shadow: 12px 20px 20px 3px rgba(0,0,0,0.15);
    }
    .header, .content, .footer {
        width: 90%;
        margin: auto;
        border-spacing: 2px 16px;
    }

    .content {
        text-align: justify;
    }

    .footer {
        border-top: 1px solid #D8D8D8;
    }
    .footer td {
        font-size: 14px;
    }
    @media (max-width: 425px) {
    table td {
      font-size: 14px;
    }
    p {
      font-size: 14px;
    }
    .container {
      padding: 20px 20px;
    }
    .header, .content, .footer {
      width: 95%;
    }
  }
</style>
</head>
<body>
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
    <tr>
      <td class="container">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation"
    style="height:100%;background-color:#f2f2f2;border-collapse:separate;width:100%;font-weight:normal;font-style:normal">
    <tbody>
      <tr>
        <td>&nbsp;</td>
        <td style="display:block;margin:1% auto;padding:48px 64px 41px;max-width:600px;background-color:#fff">
          <table style="margin-bottom:16px">
            <tbody>
              <tr>
                <td>
                  <img alt="jobhop" height="27"
                    src="https://ci3.googleusercontent.com/proxy/L2Rbj3rCXKpd_qLeWudssBaqroOArqbVQCjl-UV3JUd6pSLjHrIoC3lm8Rb5i2RxQDC_OZ5q09ivUTxXZQqXhrWDXeY46KdJFoUtP8LT=s0-d-e1-ft#https://assets.jobhopin.com/imgs/jobhopin-logo-20210812.png"
                    style="margin:0 auto;display:block" width="116" class="CToWUd" data-bit="iit">
                </td>
              </tr>
            </tbody>
          </table>
          <table style="margin:auto">
            <tbody>
              <tr style="margin-bottom:48px;display:block">
                <td>
                  <img height="160"
                    src="https://ci4.googleusercontent.com/proxy/MroJLnq3iq4o2Rt4bF6_2Z2_7urw-lTf1Btl74sKDRNUOXsQnZIoT6VJKYJitGgR-Taghl2M2iJgUEpAzGua6E8K4rRM1sxFtj8=s0-d-e1-ft#https://assets.jobhopin.com/imgs/email/bunny_say_hi.png"
                    width="160" class="CToWUd a6T" data-bit="iit" tabindex="0">
                  <div class="a6S" dir="ltr" style="opacity: 0.01; left: 956.688px; top: 240.312px;">
                    <div id=":nu" class="T-I J-J5-Ji aQv T-I-ax7 L3 a5q" role="button" tabindex="0"
                      aria-label="Download attachment " data-tooltip-class="a1V" data-tooltip="Download">
                      <div class="akn">
                        <div class="aSK J-J5-Ji aYr"></div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <table>
            <tbody>
              <tr
                style="font-style:normal;font-size:16px;line-height:22px;color:#050827;font-weight:normal;margin-bottom:24px;display:block">
                <td>
                  <strong>Welcome to JobHopin!</strong>
                </td>
              </tr>
              <tr
                style="font-style:normal;font-size:16px;line-height:22px;color:#050827;font-weight:normal;margin-bottom:24px;display:block">
                <td>
                  Please use the 6-digit code below to verify your email address.
                </td>
              </tr>
            </tbody>
          </table>
          <table style="width:100%">
            <tbody>
              <tr>
                <td style="width:100%;display:block">
                  <p
                    style="font-style:normal;font-weight:500;font-size:32px;line-height:32px;text-align:center;letter-spacing:0.16em;color:#050827;margin:0 0 24px;padding:16px 0;background:#f6f6f7;border-radius:8px">
                    ${verifyCode}</p>
                </td>
              </tr>
            </tbody>
          </table>
          <table>
            <tbody>
              <tr
                style="font-style:normal;font-size:16px;line-height:22px;color:#050827;font-weight:normal;margin-bottom:24px;display:block">
                <td>
                  This code will expire in 30 minutes. If you didn't request the code, simply ignore this email.
                </td>
              </tr>
              <tr
                style="font-style:normal;font-size:16px;line-height:22px;color:#050827;font-weight:normal;margin-bottom:24px;display:block">
                <td>
                  Regards,<br><strong>JobHopin
                    Team</strong>
                </td>
              </tr>
            </tbody>
          </table>
  
          <table style="margin:auto;font-style:normal;font-weight:normal;text-align:center;color:#121951;width:100%">
            <tbody>
              <tr>
                <td style="display:block">
                  <hr>
                </td>
              </tr>
              <tr>
                <td style="display:block">
                  <p style="padding:0;line-height:21px;margin:18px 0;vertical-align:top;font-size:16px;color:#1b1c1b">
                    Let's connect!</p>
                </td>
              </tr>
              <tr>
                <td style="display:block;margin-bottom:32px;text-align:center;vertical-align:middle">
                  <a href="http://email.mg.jobhop.in/c/eJw1jUEOgjAQRU9Dl03LdKbMogs33oPC1CLaEkSJtxdjTN7qvZ98CZYILCA5UmMQSR2imv4WnWevLeqO2RmHyMYZQjJku8YZixLJY7JArcoB2j4Si0T2HrwwD96YCBHHNlkCVreQt215NHBq2vPBvu869YPEWmc91PuhrjXmuuhXUWuYc1-yzs93ydtay-V4_OWpfNcfvHw2HA"
                    style="text-decoration:none;display:inline-block;margin:0 10px" target="_blank"
                    data-saferedirecturl="https://www.google.com/url?q=http://email.mg.jobhop.in/c/eJw1jUEOgjAQRU9Dl03LdKbMogs33oPC1CLaEkSJtxdjTN7qvZ98CZYILCA5UmMQSR2imv4WnWevLeqO2RmHyMYZQjJku8YZixLJY7JArcoB2j4Si0T2HrwwD96YCBHHNlkCVreQt215NHBq2vPBvu869YPEWmc91PuhrjXmuuhXUWuYc1-yzs93ydtay-V4_OWpfNcfvHw2HA&amp;source=gmail&amp;ust=1663914116397000&amp;usg=AOvVaw0EapARCcQc7hdFw25PltUI">
                    <img alt="fb-jobhop" height="25"
                      src="https://ci3.googleusercontent.com/proxy/Id3WSOQOSeoVxQ7HAIhtlrICmuAdPvtfyW2i7fTi5JvZH3U20DWHMitiLizjdGimPVVxF0ZlbfOftgtSdXr_neP5TVXqXQ=s0-d-e1-ft#https://assets.jobhopin.com/imgs/email/linkedin.png"
                      width="25" class="CToWUd" data-bit="iit">
                  </a>
                  <a href="http://email.mg.jobhop.in/c/eJw1TdsOgyAU-xp5JFzOOcgDD3vZf4DiYDow6mL8-5GYJU3TNm0anSTSUiMBsdHFOPWILP9TBGMNl8h7a0EAohUgCEmQ7DsQEmMgg5PUpFhyUlkIStggQesQvRckjG08BIQRJ7a4dBzr3ulHp54N53nyJZc5jrnwoX5a1Hj15WrqXUOqq9-zb4Ztbk6-JJ6-V0nHVsur_d-Ve_sDsog6yg"
                    style="text-decoration:none;display:inline-block;margin:0 10px" target="_blank"
                    data-saferedirecturl="https://www.google.com/url?q=http://email.mg.jobhop.in/c/eJw1TdsOgyAU-xp5JFzOOcgDD3vZf4DiYDow6mL8-5GYJU3TNm0anSTSUiMBsdHFOPWILP9TBGMNl8h7a0EAohUgCEmQ7DsQEmMgg5PUpFhyUlkIStggQesQvRckjG08BIQRJ7a4dBzr3ulHp54N53nyJZc5jrnwoX5a1Hj15WrqXUOqq9-zb4Ztbk6-JJ6-V0nHVsur_d-Ve_sDsog6yg&amp;source=gmail&amp;ust=1663914116397000&amp;usg=AOvVaw1qVSd-MZmr6gEaGyWprcPS">
                    <img alt="linkedin-jobhop" height="25"
                      src="https://ci5.googleusercontent.com/proxy/M6xV9NCDl4BunCvk5Mk9PHLLXSx1Jrmc_jS0GPgbbasP26om_mrFU9qbGGB8jdUniBMe4d5U-BLPYB9ccWgR_qNYUhY_tQ=s0-d-e1-ft#https://assets.jobhopin.com/imgs/email/facebook.png"
                      width="11" class="CToWUd" data-bit="iit">
                  </a>
                  <a href="http://email.mg.jobhop.in/c/eJw1jTsOwyAQRE9jSrR8doGCIk3uYewlOB-wHCdWbh-kKNI08zRPw1ERGWWQLIk5MmePKJY_ReuCkwqlD8GCRQxggZCAlB8sKOREDrMypEWJntkD5NRFx1lD0E47TnryE40zzeIey76vz8GcBn3uOY5DXlsqbZXv2jtXscVbGWuR5fWpZd9avfSf32apcmqPL8K7Mp4"
                    style="text-decoration:none;display:inline-block;margin:0 10px" target="_blank"
                    data-saferedirecturl="https://www.google.com/url?q=http://email.mg.jobhop.in/c/eJw1jTsOwyAQRE9jSrR8doGCIk3uYewlOB-wHCdWbh-kKNI08zRPw1ERGWWQLIk5MmePKJY_ReuCkwqlD8GCRQxggZCAlB8sKOREDrMypEWJntkD5NRFx1lD0E47TnryE40zzeIey76vz8GcBn3uOY5DXlsqbZXv2jtXscVbGWuR5fWpZd9avfSf32apcmqPL8K7Mp4&amp;source=gmail&amp;ust=1663914116397000&amp;usg=AOvVaw04QzGi3mnRlDTnxAN34Yyr">
                    <img alt="page-jobhop" height="25"
                      src="https://ci5.googleusercontent.com/proxy/EgOKAckW-uIoheSmokqVJp9phrq_jXuCxcz6RO1OpdDVSfGsM-HTsVSZbIsUt9Hx2axFJgjVtmmaq0tHxN2OOreXEx7M=s0-d-e1-ft#https://assets.jobhopin.com/imgs/email/youtube.png"
                      width="36" class="CToWUd" data-bit="iit">
                  </a>
                  <a href="http://email.mg.jobhop.in/c/eJw1jTsOwyAQRE9jSrR8doGCIk3uYewlOB-wHCdWbh-kKNI08zRPw1ERGWWQLIk5MmePKJY_ReuCkwqlD8GCRQxggZCAlB8sKOREDrMypEWJntkD5NRFx1lD0E47TnryE40zzeIey76vz8GcBn3uOY5DXlsqbZXv2jtXscVbGWuR5fWpZd9avfSf32apcmqPL8K7Mp4"
                    style="text-decoration:none;display:inline-block;margin:0 10px" target="_blank"
                    data-saferedirecturl="https://www.google.com/url?q=http://email.mg.jobhop.in/c/eJw1jTsOwyAQRE9jSrR8doGCIk3uYewlOB-wHCdWbh-kKNI08zRPw1ERGWWQLIk5MmePKJY_ReuCkwqlD8GCRQxggZCAlB8sKOREDrMypEWJntkD5NRFx1lD0E47TnryE40zzeIey76vz8GcBn3uOY5DXlsqbZXv2jtXscVbGWuR5fWpZd9avfSf32apcmqPL8K7Mp4&amp;source=gmail&amp;ust=1663914116397000&amp;usg=AOvVaw04QzGi3mnRlDTnxAN34Yyr">
                    <img alt="page-jobhop" height="25"
                      src="https://ci6.googleusercontent.com/proxy/HU_QkJApzEFD9xgCpx7IUfAGuHC5yvQW0bgIR3lYoxKcfQQnni_sMN8Ns5OeTQh_BBTkrrA_7F_6Ag5pLwMxMbGl=s0-d-e1-ft#https://assets.jobhopin.com/imgs/email/chat.png"
                      width="33" class="CToWUd" data-bit="iit">
                  </a>
                  <a href="http://email.mg.jobhop.in/c/eJw1jTsOwyAQRE9jSrR8doGCIk3uYewlOB-wHCdWbh-kKNI08zRPw1ERGWWQLIk5MmePKJY_ReuCkwqlD8GCRQxggZCAlB8sKOREDrMypEWJntkD5NRFx1lD0E47TnryE40zzeIey76vz8GcBn3uOY5DXlsqbZXv2jtXscVbGWuR5fWpZd9avfSf32apcmqPL8K7Mp4"
                    style="text-decoration:none;display:inline-block;margin:0 10px" target="_blank"
                    data-saferedirecturl="https://www.google.com/url?q=http://email.mg.jobhop.in/c/eJw1jTsOwyAQRE9jSrR8doGCIk3uYewlOB-wHCdWbh-kKNI08zRPw1ERGWWQLIk5MmePKJY_ReuCkwqlD8GCRQxggZCAlB8sKOREDrMypEWJntkD5NRFx1lD0E47TnryE40zzeIey76vz8GcBn3uOY5DXlsqbZXv2jtXscVbGWuR5fWpZd9avfSf32apcmqPL8K7Mp4&amp;source=gmail&amp;ust=1663914116397000&amp;usg=AOvVaw04QzGi3mnRlDTnxAN34Yyr">
                    <img alt="page-jobhop" height="25"
                      src="https://ci3.googleusercontent.com/proxy/6-hRo8rVWFy-JXOPytrCSpAlSfG6ADDUcykU94sGNJQU9e5KSa46_iB2_7CzkKlPUmraChNQOhlQxYLxQW98tcZcx-cq2w=s0-d-e1-ft#https://assets.jobhopin.com/imgs/email/telegram.png"
                      width="33" class="CToWUd" data-bit="iit">
                  </a>
                </td>
              </tr>
              <tr>
                <td style="display:block">
                  <hr>
                </td>
              </tr>
              <tr>
                <td style="display:block">
                  <p
                    style="padding:0;line-height:21px;margin:18px 0;vertical-align:top;font-size:16px;color:#1b1c1b;margin-bottom:8px">
                    Need help?</p>
                </td>
              </tr>
              <tr>
                <td style="display:block">
                  <p style="padding:0;margin:0;line-height:21px;vertical-align:top;font-size:16px;color:#1b1c1b">We are
                    here to answer any questions you might have:</p>
                </td>
                <td style="display:block">
                  <p style="padding:0;margin:0;line-height:21px;vertical-align:top;font-size:16px;color:#1b1c1b"><a
                      href="mailto:hello@jobhopin.com" target="_blank">hello@jobhopin.com</a></p>
                </td>
              </tr>
              <tr>
                <td style="display:block;margin-bottom:32px;margin:34px 0 0;text-align:center;vertical-align:middle">
                  <a href="http://email.mg.jobhop.in/c/eJw1jTsOwyAQBU9jSsTC7gIFRZrcAwIOzgcj2yly-xBFkZ6mGGn0SgBmA4YYWeRQyuyIxPK3hNZbCSSd96iQyCtUTKwY3IQKqCS2NINhLWqYk3JR6eKVtpCICkVKyWqfM8Qck3iEehx9n8xp0uex2PsuBx5FXtbnTwwuGbRB9JqcE1u419iqrK93q8e2tus4vq2prn1p3-wDE4E3Bg"
                    style="text-decoration:none;display:inline-block;margin:0 12px" target="_blank"
                    data-saferedirecturl="https://www.google.com/url?q=http://email.mg.jobhop.in/c/eJw1jTsOwyAQBU9jSsTC7gIFRZrcAwIOzgcj2yly-xBFkZ6mGGn0SgBmA4YYWeRQyuyIxPK3hNZbCSSd96iQyCtUTKwY3IQKqCS2NINhLWqYk3JR6eKVtpCICkVKyWqfM8Qck3iEehx9n8xp0uex2PsuBx5FXtbnTwwuGbRB9JqcE1u419iqrK93q8e2tus4vq2prn1p3-wDE4E3Bg&amp;source=gmail&amp;ust=1663914116397000&amp;usg=AOvVaw1W7-R7yJduK_XH3OcDKAAs">
                    <img alt="fb-jobhop" height="44"
                      src="https://ci4.googleusercontent.com/proxy/XXVKQvj5R3SI63Udd9JX5NrqYLl83qHZZh4c8p05st8eMF8FbWzw4_RNnAjAdnQ20QiINRPhU-Q6LNeXAgQ_ZgCATYozzkey=s0-d-e1-ft#https://assets.jobhopin.com/imgs/email/applestore.png"
                      width="148" class="CToWUd" data-bit="iit">
                  </a>
                  <a href="http://email.mg.jobhop.in/c/eJw1jkEKwyAURE8Tl6LR_9WFi0LJPX6qibaphtQWevtaSmFgYHgzTPQSUUkFqJEFH-NiAVj-p6CNM1wCt85poQGc0AIBBUo7aCEhzmhgkQpHljzoZSapFBhBRI5GJ5wha7QV1i4usM2n1vbHoE7DOHXtG735Wuu6RX6p9548Wj1id9o7Nk4hNspbL0w5DOr8Kvxa51R3TiUcNQd2-Fuiknh6vktqRy1rv_VjcvlufgApdkKT"
                    style="text-decoration:none;display:inline-block;margin:0 12px" target="_blank"
                    data-saferedirecturl="https://www.google.com/url?q=http://email.mg.jobhop.in/c/eJw1jkEKwyAURE8Tl6LR_9WFi0LJPX6qibaphtQWevtaSmFgYHgzTPQSUUkFqJEFH-NiAVj-p6CNM1wCt85poQGc0AIBBUo7aCEhzmhgkQpHljzoZSapFBhBRI5GJ5wha7QV1i4usM2n1vbHoE7DOHXtG735Wuu6RX6p9548Wj1id9o7Nk4hNspbL0w5DOr8Kvxa51R3TiUcNQd2-Fuiknh6vktqRy1rv_VjcvlufgApdkKT&amp;source=gmail&amp;ust=1663914116397000&amp;usg=AOvVaw1Lxyshr7BACyT4ZkP-tJdX">
                    <img alt="linkedin-jobhop" height="44"
                      src="https://ci4.googleusercontent.com/proxy/FLIWaisoiRVP4_XIkGpEIM5LzX57Ge8rOuDMbbSpMFofZ45dvkRkiAhtQfTVfC7xbik94A9N1le4H55RvYc3dRndU_bveFP1CQ=s0-d-e1-ft#https://assets.jobhopin.com/imgs/email/googlestore.png"
                      width="148" class="CToWUd" data-bit="iit">
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>

      </td>
    </tr>
  </table>
</body>
</html>
`;
};
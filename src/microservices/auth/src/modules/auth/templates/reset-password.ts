export const loadResetPasswordTemplate = ({ resetPasswordLink }) => {
  return `
  <table border="0" cellpadding="0" cellspacing="0" role="presentation"
    style="height:100%;background-color:#f2f2f2;border-collapse:separate;width:100%;font-weight:normal;font-style:normal">
    <tbody>
      <tr>
        <td style="vertical-align:top;font-size:16px;color:#1b1c1b"> </td>
        <td
          style="vertical-align:top;font-size:16px;color:#1b1c1b;display:block;margin:1% auto;padding:27px 0 37px;width:600px;max-width:600px;background-color:#fff">
          <table style="margin:auto;padding-bottom:27px">
            <tbody>
              <tr>
                <td style="vertical-align:top;font-size:16px;color:#1b1c1b"><img alt="jobhop" height="27"
                    src="https://assets.jobhopin.com/imgs/jobhopin-logo-20210812.png"
                    style="margin:0 auto;display:block" width="116" class="CToWUd" data-bit="iit"></td>
              </tr>
            </tbody>
          </table>
          <table style="margin:auto;padding:0 18px">
            <tbody>
              <tr>
                <td style="vertical-align:top;font-size:16px;color:#1b1c1b">
                  <table style="background:#006bbd;padding-top:22px;margin-bottom:25px">
                    <tbody>
                      <tr>
                        <td style="vertical-align:top;font-size:16px;color:#1b1c1b"><img
                            src="https://assets.jobhopin.com/imgs/email/reset-password.png"
                            width="100%" class="CToWUd a6T" data-bit="iit" tabindex="0">
                          <div class="a6S" dir="ltr" style="opacity: 0.01; left: 1162.5px; top: 283.688px;">
                            <div id=":12t" class="T-I J-J5-Ji aQv T-I-ax7 L3 a5q" role="button" tabindex="0"
                              aria-label="Download attachment " data-tooltip-class="a1V" data-tooltip="Download">
                              <div class="akn">
                                <div class="aSK J-J5-Ji aYr"></div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr style="margin-bottom:21px">
                        <td style="vertical-align:top;font-size:16px;color:#1b1c1b">
                          <p
                            style="padding:0;font-style:normal;font-weight:600;font-size:40px;line-height:45px;text-align:center;color:#c8eff9;width:85%;margin:4px auto 26px">
                            Bạn đã yêu cầu đổi mật khẩu</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="vertical-align:top;font-size:16px;color:#1b1c1b;margin-bottom:25px;display:block">
                  <p
                    style="padding:0;margin:0;font-style:normal;font-weight:normal;font-size:18px;line-height:21px;color:#121951">
                    Xin chào, Bunny AI vừa nhận được yêu cầu cài đặt lại mật khẩu tài khoản JobHopin của bạn. Để thay đổi
                    mật khẩu, vui lòng nhấn vào nút bên dưới và hoàn tất thao tác theo hướng dẫn.</p>
                </td>
              </tr>
              <tr>
                <td style="vertical-align:top;font-size:16px;color:#1b1c1b;margin-bottom:25px;display:block"><a
                    href="${resetPasswordLink}"
                    style="text-decoration:none;display:table;background:#006bbd;border-radius:6px;padding:10px 30px;font-style:normal;font-weight:600;font-size:18px;line-height:21px;text-align:center;color:#c8eff9;margin:0 auto"
                    target="_blank"
                    z>Đổi
                    mật khẩu</a></td>
              </tr>
              <tr>
                <td style="vertical-align:top;font-size:16px;color:#1b1c1b;display:block;margin-bottom:25px">
                  <table style="padding:9px 21px 16px;background:#121951;border-radius:18px">
                    <tbody>
                      <tr>
                        <td style="vertical-align:top;font-size:16px;color:#1b1c1b"><img height="112"
                            src="https://assets.jobhopin.com/imgs/email/please-note.png"
                            width="142" class="CToWUd" data-bit="iit"></td>
                        <td style="vertical-align:top;font-size:16px;color:#1b1c1b;padding:10px 16px 0">
                          <p
                            style="padding:0;margin:0;font-style:normal;letter-spacing:0.01em;color:#c8eff9;font-weight:bold;font-size:18px;line-height:21px;margin-bottom:12px">
                            Lưu ý</p>
                          <p
                            style="padding:0;margin:0;font-style:normal;font-weight:normal;font-size:14px;line-height:16px;letter-spacing:0.01em;color:#c8eff9">
                            Đường link này có hiệu lực cho một lần cài đặt và sẽ hết hạn sau 24 giờ. Hãy nhanh chóng hoàn
                            tất thiết lập tài khoản nha!</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table
            style="margin:auto;font-style:normal;font-weight:normal;text-align:center;color:#121951;padding:0 30px;width:100%">
            <tbody>
              <tr>
                <td style="vertical-align:top;font-size:16px;color:#1b1c1b;display:block">
                  <hr>
                </td>
              </tr>
              <tr>
                <td style="vertical-align:top;font-size:16px;color:#1b1c1b;display:block">
                  <p style="padding:0;font-size:18px;line-height:29px;margin:18px 0">Kết nối với JobHopin!</p>
                </td>
              </tr>
              <tr>
                <td
                  style="text-align:center;vertical-align:middle;font-size:16px;color:#1b1c1b;display:block;margin-bottom:32px">
                  <a href="http://email.mg.jobhopin.com/c/eJxFUk2ToyAQ_TXmFgv8AD14QB2zbnYyYyVxk1y2FIkQDVoGx3F-_RB3q7aKarrfa7qbByyACNme5brAXVVB6YGKwpUIfGj5GCGATYSxj83_WRAgwwGiX0OwhnDtQm09k43riT3UGpq0u_ejYqaQig2yaFc8cGFReYBCBDHWBXBZUhtbbkWvpe841Fm1AVeqfxg2MaxEr0l8DR1tmLoXojUlUxobDDthhh1vJz5cQy-JTj4qCffj_eXG6mMUksu9mCe43YPH7jiFhOza0grRRZz3EUjyrKGG5Vrh7jAdd_HRTxOV01M2FLMzpgfPewfuwp8asuzv8aPbCQf_TKaMtvWCvR2a8XU-98Ux32bQS1-_Ln154rdrdk7DrOLlJlzyog0XLCMkIpeW_XD7NCJ1uoHk90vq_JLhZ7UH3VvefuT5y-fbTGVq1x-GhfQV479CWK69TJEsZpomsxWyYZWQT30X8KlzIefFv3Ul73oh_x1BVBdyPR8D5AGgY9U1TGps0-Z5RNQ-zs5JmD31sOMnPcyahNozLOfatW03_Rl0s4FRpQk1jGw1BA0vZM3HWXLf0j-gXt5GT_EN-t2u2g"
                    style="text-decoration:none;display:inline-block;margin:0 35px" target="_blank"
                    data-saferedirecturl="http://email.mg.jobhopin.com/c/eJxFUk2ToyAQ_TXmFgv8AD14QB2zbnYyYyVxk1y2FIkQDVoGx3F-_RB3q7aKarrfa7qbByyACNme5brAXVVB6YGKwpUIfGj5GCGATYSxj83_WRAgwwGiX0OwhnDtQm09k43riT3UGpq0u_ejYqaQig2yaFc8cGFReYBCBDHWBXBZUhtbbkWvpe841Fm1AVeqfxg2MaxEr0l8DR1tmLoXojUlUxobDDthhh1vJz5cQy-JTj4qCffj_eXG6mMUksu9mCe43YPH7jiFhOza0grRRZz3EUjyrKGG5Vrh7jAdd_HRTxOV01M2FLMzpgfPewfuwp8asuzv8aPbCQf_TKaMtvWCvR2a8XU-98Ux32bQS1-_Ln154rdrdk7DrOLlJlzyog0XLCMkIpeW_XD7NCJ1uoHk90vq_JLhZ7UH3VvefuT5y-fbTGVq1x-GhfQV479CWK69TJEsZpomsxWyYZWQT30X8KlzIefFv3Ul73oh_x1BVBdyPR8D5AGgY9U1TGps0-Z5RNQ-zs5JmD31sOMnPcyahNozLOfatW03_Rl0s4FRpQk1jGw1BA0vZM3HWXLf0j-gXt5GT_EN-t2u2g&amp;source=gmail&amp;ust=1663911938636000&amp;usg=AOvVaw2Mo0Ig7apuKWlpIHSLTAF7"><img
                      alt="fb-jobhop" height="25"
                      src="https://assets.jobhopin.com/imgs/email/linkedin.png"
                      width="25" class="CToWUd" data-bit="iit"> </a> <a
                    href="http://email.mg.jobhopin.com/c/eJxFUUuPmzAQ_jXkFmQDNubAwcCS0nSTRUkoyaUCYx6BACJmveyvr0MPlUYznu-b8by4CzE2iYEQQJvCzQkoGNw0rgMNx8YY2Dq2bcfW_0dBgDULNOMWgi2EWwSVJjqft5I_xRbqbHiMs-B60ws-9Vm3qV3HRsRmmFk2IZCVBiMEOYgVGLDcQqW56dxaiPGpmVQzQiWy-Z4G1nLxyJpO77lQ2KSZIdfMYC_rqfRI6KcOzmntBKfbnVcX36O3R7ZIuD-B5-EiPUoPXW54-NZcTz4Ik7hlmoEM73CWl0NwcaJQJCyNp2yx5uhMyAdAK5-2dLUfwXM4NJb9M5Qx66oVO57b-X25jtkl2ceQRO_ftzFP63sZXyMvLup8561x_q5ueEypT28d_4HGyKdVtIP091tk_eq9r-IEhmPSfSbJ29dxYX1kVp-agdWIwb9FGMhcuwhXJaXUy4zxfBja135X8D7k9TA2vcpjKg8RxwaYAKB8MbS8V9iuS1JPipRWdOdV19evwYueFkVC9dIMqxy6bpB_Jl40E2dCEWKa-WZy2zrrq3pe-tox1MGr9RSq-F-ewaoE"
                    style="text-decoration:none;display:inline-block;margin:0 35px" target="_blank"
                    data-saferedirecturl="http://email.mg.jobhopin.com/c/eJxFUUuPmzAQ_jXkFmQDNubAwcCS0nSTRUkoyaUCYx6BACJmveyvr0MPlUYznu-b8by4CzE2iYEQQJvCzQkoGNw0rgMNx8YY2Dq2bcfW_0dBgDULNOMWgi2EWwSVJjqft5I_xRbqbHiMs-B60ws-9Vm3qV3HRsRmmFk2IZCVBiMEOYgVGLDcQqW56dxaiPGpmVQzQiWy-Z4G1nLxyJpO77lQ2KSZIdfMYC_rqfRI6KcOzmntBKfbnVcX36O3R7ZIuD-B5-EiPUoPXW54-NZcTz4Ik7hlmoEM73CWl0NwcaJQJCyNp2yx5uhMyAdAK5-2dLUfwXM4NJb9M5Qx66oVO57b-X25jtkl2ceQRO_ftzFP63sZXyMvLup8561x_q5ueEypT28d_4HGyKdVtIP091tk_eq9r-IEhmPSfSbJ29dxYX1kVp-agdWIwb9FGMhcuwhXJaXUy4zxfBja135X8D7k9TA2vcpjKg8RxwaYAKB8MbS8V9iuS1JPipRWdOdV19evwYueFkVC9dIMqxy6bpB_Jl40E2dCEWKa-WZy2zrrq3pe-tox1MGr9RSq-F-ewaoE&amp;source=gmail&amp;ust=1663911938636000&amp;usg=AOvVaw3PLwIa8YbqZJVBq9nXTo9R">
                    <img alt="linkedin-jobhop" height="25"
                      src="https://assets.jobhopin.com/imgs/email/facebook.png"
                      width="11" class="CToWUd" data-bit="iit"> </a> <a
                    href="http://email.mg.jobhopin.com/c/eJxFUUuTojAQ_jV4k0oCCXDgEGBw0FWHQln1skUgAgMChWEyzK_fyB62qqsf39fd1Q_uQkIMG2EM8KpwmQ2KHK5q14HIsQgBlk4sy7H0_1kQEM0E9bCGYA3hGkOlbZ1Pa8mfYg31vH8Mk-B63Qk-dlm7qlxwx9BkmGUFywvlI0hsjBBjDskwcMxV61ZCDE_NoBoKlcj6Z-zzhotHVrd6x4XCRs0IuWYEO1mNd88O_YtDGK2cILl98vLse_T2yGYJdwl4Hs7So_TQMuSRW31NfBCmcZNrCCPvcJLnQ3B2olCk-SUes9mcopNtfwC88JeGLvYjePaH2rS2oYzztlyw46mZ9vN1yM7pLoZ2tP-5DexSfd7ja-TFRcU23pLnb6qax5T69NbydzxEPi2jDaS_3yLzV-d9Fwnoj2n7laZv38c57yKj_NIQUSsG_w6BsLFMES5KSqnP_SQmxl_nXbBlmXDbs_d-qDtVnKtibDsWIDYAKhZ9wzuFbdo09ug2obLZe_T6ah286HFWJFSehsx737a9_DPyoh55LhQhxomvRrepsq6sprmrHKS-Xi7_UCP8Bfe2qt4"
                    style="text-decoration:none;display:inline-block;margin:0 35px" target="_blank"
                    data-saferedirecturl="http://email.mg.jobhopin.com/c/eJxFUUuTojAQ_jV4k0oCCXDgEGBw0FWHQln1skUgAgMChWEyzK_fyB62qqsf39fd1Q_uQkIMG2EM8KpwmQ2KHK5q14HIsQgBlk4sy7H0_1kQEM0E9bCGYA3hGkOlbZ1Pa8mfYg31vH8Mk-B63Qk-dlm7qlxwx9BkmGUFywvlI0hsjBBjDskwcMxV61ZCDE_NoBoKlcj6Z-zzhotHVrd6x4XCRs0IuWYEO1mNd88O_YtDGK2cILl98vLse_T2yGYJdwl4Hs7So_TQMuSRW31NfBCmcZNrCCPvcJLnQ3B2olCk-SUes9mcopNtfwC88JeGLvYjePaH2rS2oYzztlyw46mZ9vN1yM7pLoZ2tP-5DexSfd7ja-TFRcU23pLnb6qax5T69NbydzxEPi2jDaS_3yLzV-d9Fwnoj2n7laZv38c57yKj_NIQUSsG_w6BsLFMES5KSqnP_SQmxl_nXbBlmXDbs_d-qDtVnKtibDsWIDYAKhZ9wzuFbdo09ug2obLZe_T6ah286HFWJFSehsx737a9_DPyoh55LhQhxomvRrepsq6sprmrHKS-Xi7_UCP8Bfe2qt4&amp;source=gmail&amp;ust=1663911938636000&amp;usg=AOvVaw2g7SLFumrpr6jNBOfouPKr">
                    <img alt="page-jobhop" height="25"
                      src="https://assets.jobhopin.com/imgs/email/youtube.png"
                      width="36" class="CToWUd" data-bit="iit"> </a> <a
                    href="http://email.mg.jobhopin.com/c/eJxFUl2PojAU_TX4JmmLQHnwAXRwGXd0iMKqLwZqgUqhBMt0mF-_ldmPpDnNPefc5tyb0iV0HAsj2wb27LbMMbgROGNLDyLPdRzgmo7req753wWBYywA6-YQzCGc21AjNukwV_Qh59AkoukGSU3WStq3GZ9VS-ICjG1SeDTDmAK0cG80dzHJ3SIngOAZX1ZSdg_D8g0U6qPYVy9ITWWTMW62VGquN6yQGtZ6q6q-CHC4OnlO7lfe-nC50zJZBf6lyUYFtwfw2CUq8P0dz1HgXNj5sAJhGtfEQDYKdkeV7NaJF4UyJae4z8bFEB0xfgf2pJ9qf7rf1w-xYwv3NVQx4eXE7Y_18DaeuyxJtzHE0dvXpctP1b2Iz1EQ36p8E0y-1aZiNPb9lX_h9IfdRSu_jDbQ__USLX62weftAMQ-5R9p-vK5H0kbWeWHgRw94vp7Eci2phThBEop8y7ySnSsfe53InMuyr8WKxxkc32IoSf0Wa7ptDjCnxVynmJDb2xoJrEVkv3jSdZ0GSvbSckGKZpMMtFeCWekvloAQgQQ1OGIDmdjzwUOBkDXUtS01VzA08JXr0kQ13rK6Zk_4Mh-1IZns4EWheBcqGuvc_SUSC3IfqCzfllXWVtWw9hWHtI_q_yOLprfc9rMBQ"
                    style="text-decoration:none;display:inline-block;margin:0 35px" target="_blank"
                    data-saferedirecturl="http://email.mg.jobhopin.com/c/eJxFUl2PojAU_TX4JmmLQHnwAXRwGXd0iMKqLwZqgUqhBMt0mF-_ldmPpDnNPefc5tyb0iV0HAsj2wb27LbMMbgROGNLDyLPdRzgmo7req753wWBYywA6-YQzCGc21AjNukwV_Qh59AkoukGSU3WStq3GZ9VS-ICjG1SeDTDmAK0cG80dzHJ3SIngOAZX1ZSdg_D8g0U6qPYVy9ITWWTMW62VGquN6yQGtZ6q6q-CHC4OnlO7lfe-nC50zJZBf6lyUYFtwfw2CUq8P0dz1HgXNj5sAJhGtfEQDYKdkeV7NaJF4UyJae4z8bFEB0xfgf2pJ9qf7rf1w-xYwv3NVQx4eXE7Y_18DaeuyxJtzHE0dvXpctP1b2Iz1EQ36p8E0y-1aZiNPb9lX_h9IfdRSu_jDbQ__USLX62weftAMQ-5R9p-vK5H0kbWeWHgRw94vp7Eci2phThBEop8y7ySnSsfe53InMuyr8WKxxkc32IoSf0Wa7ptDjCnxVynmJDb2xoJrEVkv3jSdZ0GSvbSckGKZpMMtFeCWekvloAQgQQ1OGIDmdjzwUOBkDXUtS01VzA08JXr0kQ13rK6Zk_4Mh-1IZns4EWheBcqGuvc_SUSC3IfqCzfllXWVtWw9hWHtI_q_yOLprfc9rMBQ&amp;source=gmail&amp;ust=1663911938636000&amp;usg=AOvVaw22zaj1O6807NFsgXEWNKdk">
                    <img alt="page-jobhop" height="25"
                      src="https://assets.jobhopin.com/imgs/email/chat.png"
                      width="33" class="CToWUd" data-bit="iit"> </a> <a
                    href="http://email.mg.jobhopin.com/c/eJxFkcGOmzAURb-G7IJsgw0sWBgYUpoOGZRAEzYVGAc8EEDEDMN8fV1aqZJ1_Xzf0ZPty11IiGEjjAHeVW5pg4rBnXAdiByLEGDpxLIcS_9PQUA0E4hxD8Eewj2GSm2dz_uFP-Ue6mx4jLPkuugln_qi2zUuZthCVVEgZhmEc6NijJglA-xuQgJJtevcRsrxqRlUQ6Fai_iaBtZy-ShEp_dcKm_SjJBrRnBcmunu2aF_dUhJGyc45--8Tn2P5o9iXeDxDJ5xuniUxl2JPJKL29kHYZa0TEMYefFlSeMgdaJQZuyaTMVqztHFtt8A3vrXlm77W_AcYmFa38MlYV29eadLO7-ut7FIs2MC7ej1Kx_La_N-T26Rl1RNefA2zj80gieU-jTv-Dc8Rj6towOkP18i80fvfVZnMJyy7iPLXj5PK-sjo_7QEFFPDP5-BMLGdotwE6k_-FZUohatqAuhYKZgbDsWIDYA6iyHlvfKO3TxmdZjSmnt0z9DjOCfEDmtCoCq0pB5H7puWH5NvBITZ1I15DTz3eS2TdHXzbz2jYNU0vWWgUr1N4i5pqY"
                    target="_blank"
                    data-saferedirecturl="http://email.mg.jobhopin.com/c/eJxFkcGOmzAURb-G7IJsgw0sWBgYUpoOGZRAEzYVGAc8EEDEDMN8fV1aqZJ1_Xzf0ZPty11IiGEjjAHeVW5pg4rBnXAdiByLEGDpxLIcS_9PQUA0E4hxD8Eewj2GSm2dz_uFP-Ue6mx4jLPkuugln_qi2zUuZthCVVEgZhmEc6NijJglA-xuQgJJtevcRsrxqRlUQ6Fai_iaBtZy-ShEp_dcKm_SjJBrRnBcmunu2aF_dUhJGyc45--8Tn2P5o9iXeDxDJ5xuniUxl2JPJKL29kHYZa0TEMYefFlSeMgdaJQZuyaTMVqztHFtt8A3vrXlm77W_AcYmFa38MlYV29eadLO7-ut7FIs2MC7ej1Kx_La_N-T26Rl1RNefA2zj80gieU-jTv-Dc8Rj6towOkP18i80fvfVZnMJyy7iPLXj5PK-sjo_7QEFFPDP5-BMLGdotwE6k_-FZUohatqAuhYKZgbDsWIDYA6iyHlvfKO3TxmdZjSmnt0z9DjOCfEDmtCoCq0pB5H7puWH5NvBITZ1I15DTz3eS2TdHXzbz2jYNU0vWWgUr1N4i5pqY&amp;source=gmail&amp;ust=1663911938636000&amp;usg=AOvVaw0nLR3Jt18iRUdbVh3c600r">
                    <img alt="page-jobhop" height="25"
                      src="https://assets.jobhopin.com/imgs/email/telegram.png"
                      width="33" class="CToWUd" data-bit="iit"> </a></td>
              </tr>
              <tr>
                <td style="vertical-align:top;font-size:16px;color:#1b1c1b;display:block">
                  <hr>
                </td>
              </tr>
              <tr>
                <td style="vertical-align:top;font-size:16px;color:#1b1c1b;display:block">
                  <p style="padding:0;font-size:18px;line-height:29px;margin:18px 0;margin-bottom:8px">Liên hệ chúng tôi
                  </p>
                </td>
              </tr>
              <tr>
                <td style="vertical-align:top;font-size:16px;color:#1b1c1b;display:block">
                  <p style="padding:0;margin:0;font-size:18px;line-height:21px">JobHopin sẵn sàng giải đáp mọi thắc mắc
                    của bạn:</p>
                </td>
                <td style="vertical-align:top;font-size:16px;color:#1b1c1b;display:block">
                  <p style="padding:0;margin:0;font-size:18px;line-height:21px"><a href="mailto:hello@jobhopin.com"
                      target="_blank">hello@jobhopin.com</a></p>
                </td>
              </tr>
              <tr>
                <td
                  style="vertical-align:top;font-size:16px;color:#1b1c1b;display:block;margin-bottom:32px;margin:34px 0 40px;text-align:center;vertical-align:middle">
                  <a href="http://email.mg.jobhopin.com/c/eJxFUU1vozAQ_TXkFmQbbMyBg4GQpdkmRQk0yWUFxgEKAURMKf31dVitVhq9mXlvNJoP4UBCDIowBniVOxkFOYeryrEhsi1CgKUTy7It_X8VBEQzQdWvIVhDuMZQIdXFuJ7EQ66hzrt7P0qhV60UQ5s2q9IxuIlutpETy8wyiLgFbIPmBIvMNG9Q0FXjlFL2D81gGgqUTdX30PFayHtaNXorpOIGzQiEZvi7qRxuLg28s00yVtr-8fohithz2fWezhPcHcFjH08uY_smQy65VpejB4IkqrmGMHL3pyne-7EdBjLh52hIZ3MMT5S-Abzo55ot_s1_dPvKtF6CKeJNsXCHUz2-zpc-jZNdBGn4-n3ts3P5cYsuoRvlZbZ1lzpvW1YiYsxj10b8wn3osSLcQva-Cc3frfuVH0F3SJrPJNl8HWbehkbxqSGiVvT_HgJhY5kiWCDt-4euoBHP6_6jFl_lEBmmaSNMqerAVQdMbQsQCoDKZVeLVnHbJnl3i5eTyzYbt3guY_hPeZiVCFWkIfPWNU03_RlEXg2CSyXIYRSrwanLtC3KcW5LG6nXF8tT1CA_XGaqtw"
                    style="text-decoration:none;display:inline-block;margin:0 12px" target="_blank"
                    data-saferedirecturl="http://email.mg.jobhopin.com/c/eJxFUU1vozAQ_TXkFmQbbMyBg4GQpdkmRQk0yWUFxgEKAURMKf31dVitVhq9mXlvNJoP4UBCDIowBniVOxkFOYeryrEhsi1CgKUTy7It_X8VBEQzQdWvIVhDuMZQIdXFuJ7EQ66hzrt7P0qhV60UQ5s2q9IxuIlutpETy8wyiLgFbIPmBIvMNG9Q0FXjlFL2D81gGgqUTdX30PFayHtaNXorpOIGzQiEZvi7qRxuLg28s00yVtr-8fohithz2fWezhPcHcFjH08uY_smQy65VpejB4IkqrmGMHL3pyne-7EdBjLh52hIZ3MMT5S-Abzo55ot_s1_dPvKtF6CKeJNsXCHUz2-zpc-jZNdBGn4-n3ts3P5cYsuoRvlZbZ1lzpvW1YiYsxj10b8wn3osSLcQva-Cc3frfuVH0F3SJrPJNl8HWbehkbxqSGiVvT_HgJhY5kiWCDt-4euoBHP6_6jFl_lEBmmaSNMqerAVQdMbQsQCoDKZVeLVnHbJnl3i5eTyzYbt3guY_hPeZiVCFWkIfPWNU03_RlEXg2CSyXIYRSrwanLtC3KcW5LG6nXF8tT1CA_XGaqtw&amp;source=gmail&amp;ust=1663911938636000&amp;usg=AOvVaw12XZOPVVY2kyLVGPFHJW7b"><img
                      alt="fb-jobhop" height="44"
                      src="https://assets.jobhopin.com/imgs/email/applestore.png"
                      width="148" class="CToWUd" data-bit="iit"> </a> <a
                    href="http://email.mg.jobhopin.com/c/eJxFUl2PmzAQ_DXkLcjmw8ADDwaOlKaXHEqgSV4qwA4QCEaOOcL9-nPcSpWs3fXsjLwem_oQIdM1bBvYK-KXLiAVXLW-Bw3PQQg4OnIcz9H_syBAmgXacQ3BGsK1DWV0dTqtZ_oQa6hX7D5OgurtICgfin7V-MRBjm3ZxLo6LqEuqKBJCCwoMkFhlNBa9X4jxPjQTKwZsVxz-8VZ1VFxL9peH6iQGNfMmGpmtJ0bfg3cODx5qMSNFx0uN1pnYYAv92KZ4fYAHrtsDjDe9aURoEt7PoQgztOu0gzbCHbHOdtFmZfEIq9OKS8Wa0qOrvsBbNU_dVjlj-jBdq3l_IzntOprhe2P3fS-nMciy7cpdJP3r8tYnprbNT0nQUqachMoXrhpWppiHOJLT3_YYxLiOtlA_PstsX4NwZMcANvn_Weevz33SzUkZv2pGUheMfprhGGbaopYhbEvFr1mrO7py16FPQTjVFXFqARGTKiQdilx3JJXij4H_cbKho16MRDOXiiq5Cm26zkAuQDIvWAdHSS26Z9HXMdZlHYRTpX8X0CCL5IAZaUZ1pX1PZv_cEpaTishG4JPdMX9rimGupmWofEM-UVq9Xhy3m-ceblF"
                    style="text-decoration:none;display:inline-block;margin:0 12px" target="_blank"
                    data-saferedirecturl="http://email.mg.jobhopin.com/c/eJxFUl2PmzAQ_DXkLcjmw8ADDwaOlKaXHEqgSV4qwA4QCEaOOcL9-nPcSpWs3fXsjLwem_oQIdM1bBvYK-KXLiAVXLW-Bw3PQQg4OnIcz9H_syBAmgXacQ3BGsK1DWV0dTqtZ_oQa6hX7D5OgurtICgfin7V-MRBjm3ZxLo6LqEuqKBJCCwoMkFhlNBa9X4jxPjQTKwZsVxz-8VZ1VFxL9peH6iQGNfMmGpmtJ0bfg3cODx5qMSNFx0uN1pnYYAv92KZ4fYAHrtsDjDe9aURoEt7PoQgztOu0gzbCHbHOdtFmZfEIq9OKS8Wa0qOrvsBbNU_dVjlj-jBdq3l_IzntOprhe2P3fS-nMciy7cpdJP3r8tYnprbNT0nQUqachMoXrhpWppiHOJLT3_YYxLiOtlA_PstsX4NwZMcANvn_Weevz33SzUkZv2pGUheMfprhGGbaopYhbEvFr1mrO7py16FPQTjVFXFqARGTKiQdilx3JJXij4H_cbKho16MRDOXiiq5Cm26zkAuQDIvWAdHSS26Z9HXMdZlHYRTpX8X0CCL5IAZaUZ1pX1PZv_cEpaTishG4JPdMX9rimGupmWofEM-UVq9Xhy3m-ceblF&amp;source=gmail&amp;ust=1663911938636000&amp;usg=AOvVaw24K_Lh8Ao1eJjmPJPF5pi6">
                    <img alt="linkedin-jobhop" height="44"
                      src="https://assets.jobhopin.com/imgs/email/googlestore.png"
                      width="148" class="CToWUd" data-bit="iit"> </a></td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>`;
};
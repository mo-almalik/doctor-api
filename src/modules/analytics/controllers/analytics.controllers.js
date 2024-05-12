import Appointment from "../../../models/appointment.js";
import { catchError } from "../../../utils/error.handler.js";



  export const  appointmentsAnalysis = catchError(async(req,res)=>{
    const appointmentsAnalysis = await Appointment.aggregate([
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                count: { $sum: 1 }
            }
        },
        { $sort: { _id: 1 } }
      ]);
     
     return res.json({ analysis: appointmentsAnalysis });
})


